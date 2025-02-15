import { DashboardLayout } from "@/components/dashboard-layout"
import { PrescriptionVerifier } from "@/components/prescription-verifier"

export default function VerifyPrescription() {
  return (
    <DashboardLayout role="Pharmacist">
      <h2 className="text-2xl font-semibold mb-6">Verify Prescription</h2>
      <PrescriptionVerifier />
    </DashboardLayout>
  )
}

