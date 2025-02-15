"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from "react";
import { ethers, keccak256 } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import contractABI from "../lib/HealthChainAbi.json";
import { getFile } from "@/lib/getFromIPFS";


const CONTRACT_ADDRESS = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"; // Replace with your deployed contract address

export function PrescriptionVerifier() {
  const [prescriptionHash, setPrescriptionHash] = useState("");
  const [verificationResult, setVerificationResult] = useState<
    "valid" | "invalid" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [ipfsData, setIpfsData] = useState(null);

  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [patientAddress, setPatientAddress] = useState("");


  const handleFetchPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI.abi,
        signer
      );

      setLoading(true);
      const fetchedPrescription = await contract.getPrescription(
        prescriptionId
      );
      console.log(fetchedPrescription);
      setPrescription(fetchedPrescription);
      setLoading(false);
      return fetchedPrescription;
    } catch (error) {
      console.error("Error fetching prescription:", error);
      setLoading(false);
    }
  };

  // const handleVerify = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   if (!window.ethereum) {
  //     alert("Metamask is required to verify a prescription.");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const formattedString = `${medication.trim().toLowerCase()}.${dosage
  //       .trim()
  //       .toLowerCase()}.${patientAddress.trim().toLowerCase()}`;
  //     const hash = keccak256(Buffer.from(formattedString));
  //     setPrescriptionHash(hash);
  //     await handleFetchPrescription();
  //     // Connect to Ethereum provider (Metamask)
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();

  //     // Connect to the contract
  //     const contract = new ethers.Contract(
  //       CONTRACT_ADDRESS,
  //       contractABI.abi,
  //       signer
  //     );

  //     // ipfs Hash of the prescription
  //     const ipfshash = prescription?.[2];

  //     if (!ipfshash) throw new Error("Prescription not found");
  //     const dataFromIPFS = await getFile(ipfshash);

  //     console.log("Got from IPFS", dataFromIPFS);

  //     // setVerificationResult(isValid ? "valid" : "invalid")
  //     console.log("This is IPFS in verification: ", dataFromIPFS);
  //     console.log("This is patient Address: ", patientAddress);
  //     console.log("This is prescription Hash: ", hash);
  //     setIpfsData(dataFromIPFS);
  //   } catch (error) {
  //     console.error("Verification failed", error);
  //     alert("Failed to verify prescription. Check console for errors.");
  //     setVerificationResult("invalid");
  //   }

  //   setLoading(false);
  // };

  const handleVerfiyPrescription = async () => {
    const formattedString = `${medication.trim().toLowerCase()}.${dosage
      .trim()
      .toLowerCase()}.${patientAddress.trim().toLowerCase()}`;
    const hash = keccak256(Buffer.from(formattedString));

    const ipfsData = await getFile(prescription![2]);

    console.log("This is type of ipfsData: ", typeof ipfsData);
    console.log("Eq1: ", ipfsData?.patientHash === patientAddress);
    console.log("Eq1: ", ipfsData?.prescriptionHash === prescriptionHash);
    console.log("prescription Hash: ", prescriptionHash, prescriptionHash.length);
    console.log("Hash: ", hash, hash.length);
    if (
      ipfsData &&
      hash &&
      // ipfsData?.patientHash === patientAddress &&
      ipfsData?.prescriptionHash === hash
    ) {
      setVerificationResult("valid");
      alert("Prescription is valid");
    } else {
      setVerificationResult("invalid");
      alert("Prescription is invalid");
    }
  };
  return (
    <div>
      <form onSubmit={handleFetchPrescription} className="space-y-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Fetch Prescription"}
        </Button>
        <br />
        <input
          type="text"
          placeholder="Enter Prescription ID"
          value={prescriptionId}
          onChange={(e) => setPrescriptionId(e.target.value)}
          className="p-2 border rounded"
        />

        {/* <Button onClick={handleFetchPrescription} disabled={loading} className="p-2 bg-blue-500 text-white rounded">
        {loading ? "Fetching..." : "Fetch Prescription"}
      </Button> */}
        {prescription && (
          <div className="p-3 border rounded mt-3">
            <p>
              <strong>Doctor:</strong> {prescription[0]}
            </p>
            <p>
              <strong>Patient:</strong> {prescription[1]}
            </p>
            <p>
              <strong>Prescription IPFS:</strong>{" "}
              <a
                href={`https://ipfs.io/ipfs/${prescription[2]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              <strong>Dispensed:</strong> {prescription[3] ? "Yes" : "No"}
            </p>
            {prescription[3] && (
              <>
                <p>
                  <strong>Pharmacist:</strong> {prescription[4]}
                </p>
                <p>
                  <strong>Dispensed IPFS:</strong>{" "}
                  <a
                    href={`https://ipfs.io/ipfs/${prescription[5]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </p>
              </>
            )}
          </div>
        )}
        {verificationResult && (
          <Alert
            variant={verificationResult === "valid" ? "default" : "destructive"}
          >
            {verificationResult === "valid" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {verificationResult === "valid"
                ? "Valid Prescription"
                : "Invalid Prescription"}
            </AlertTitle>
            <AlertDescription>
              {verificationResult === "valid"
                ? "This prescription is valid and can be filled."
                : "This prescription is not valid. Please contact your doctor."}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          <div>
            <Label htmlFor="patientAddress">Patient Address</Label>
            <Input
              id="patientAddress"
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              placeholder="Enter patient address"
              required
            />
          </div>

          <div>
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Enter medication name"
              required
            />
          </div>

          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Enter dosage"
              required
            />
          </div>

          {/* <Button onClick={computeHash}>Compute Hash</Button> */}

          {prescriptionHash && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Computed Prescription Hash</AlertTitle>
              <AlertDescription>{prescriptionHash}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
      <Button onClick={handleVerfiyPrescription}>Verify Prescription</Button>
    </div>
  );
}
