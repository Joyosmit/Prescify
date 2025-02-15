import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Users, ClipboardList } from "lucide-react"

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="Doctor">
      <h2 className="text-2xl font-semibold mb-6">Welcome, Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Prescription</CardTitle>
            <CardDescription>Create a new prescription for a patient</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor-dashboard/issue-prescription">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Issue Prescription
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Patients</CardTitle>
            <CardDescription>View and manage your patient list</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor-dashboard/manage-patients">
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" /> Manage Patients
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prescription History</CardTitle>
            <CardDescription>View your issued prescriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor-dashboard/prescription-history">
              <Button className="w-full">
                <ClipboardList className="mr-2 h-4 w-4" /> View History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

