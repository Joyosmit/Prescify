import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Search, Pill, ClipboardList } from "lucide-react"

export default function PharmacistDashboard() {
  return (
    <DashboardLayout role="Pharmacist">
      <h2 className="text-2xl font-semibold mb-6">Welcome, Pharmacist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify Prescription</CardTitle>
            <CardDescription>Verify a prescription, then dispense it if valid</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pharmacist-dashboard/verify-prescription">
              <Button className="w-full">
                <Search className="mr-2 h-4 w-4" /> Verify Prescription
              </Button>
            </Link>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Dispense Medication</CardTitle>
            <CardDescription>Record dispensed medications</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pharmacist-dashboard/dispense-medication">
              <Button className="w-full">
                <Pill className="mr-2 h-4 w-4" /> Dispense Medication
              </Button>
            </Link>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Register Yourself</CardTitle>
            <CardDescription>Get registered as a pharmacist</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pharmacist-dashboard/register-pharmacist">
              <Button className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" /> Register As Pharmacist
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

