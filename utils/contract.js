import { ethers } from "ethers";

// Replace this with your deployed contract address
const CONTRACT_ADDRESS = 0xbCc4913AE0BFF5021EbFD4db28A75AbA08A73754 

// Replace this with your actual contract ABI
const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "patientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "doctorDID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "patientDID",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "details",
          "type": "string"
        }
      ],
      "name": "PrescriptionIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "PrescriptionVerified",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_patientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_doctorDID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_patientDID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_details",
          "type": "string"
        }
      ],
      "name": "issuePrescription",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "prescriptions",
      "outputs": [
        {
          "internalType": "string",
          "name": "patientName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "doctorDID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "patientDID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "details",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isVerified",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_id",
          "type": "bytes32"
        }
      ],
      "name": "verifyPrescription",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export const getContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, providerOrSigner);
};
