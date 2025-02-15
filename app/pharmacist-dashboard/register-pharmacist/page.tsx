import { DashboardLayout } from "@/components/dashboard-layout"
import { RegistrationForm } from "@/components/registration-form"

export default function PharmacistRegistration() {
  return (
    <DashboardLayout role="Pharmacist">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Pharmacist Registration</h2>
        <RegistrationForm role="Pharmacist" />
      </div>
    </DashboardLayout>
  )
}