import { DashboardLayout } from "@/components/dashboard-layout"
import { VerifyDoctorForm } from "@/components/verify-doctor-form"

export default function VerifyYourself() {
  return (
    <DashboardLayout role="Doctor">
      <h2 className="text-2xl font-semibold mb-6">Verify Yourself</h2>
      <VerifyDoctorForm />
    </DashboardLayout>
  )
}

