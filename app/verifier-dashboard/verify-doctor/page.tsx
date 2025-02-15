import { DashboardLayout } from "@/components/dashboard-layout"
import {DoctorVerificationForm} from "@/components/doctor-verification"
// import RegisterDoctor from "@/components/register-doctor"

export default function VerifiyDoctor() {
  return (
    <DashboardLayout role="Verifier">
      <h2 className="text-2xl font-semibold mb-6">Register a Doctor</h2>
      <DoctorVerificationForm/>
    </DashboardLayout>
  )
}

