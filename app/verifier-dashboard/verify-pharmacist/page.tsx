import { DashboardLayout } from "@/components/dashboard-layout"
import { PharmacistVerificationForm } from "@/components/verify-pharmacist-form"

export default function VerifyYourself() {
  return (
    <DashboardLayout role="Verifier">
      <h2 className="text-2xl font-semibold mb-6">Verify Pharmacist</h2>
      <PharmacistVerificationForm/>
    </DashboardLayout>
  )
}

