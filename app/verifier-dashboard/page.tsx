import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileText, Users, ClipboardList } from "lucide-react"

export default function VerifierDashboard() {
  return (
    <DashboardLayout role="Verifier">
      <h2 className="text-2xl font-semibold mb-6">Welcome, Board of Verifiers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify Doctor</CardTitle>
            <CardDescription>Verify a Doctors's credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/verifier-dashboard/verify-doctor">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> Verify
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verify Pharmacist</CardTitle>
            <CardDescription>Verify a pharmacist's credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/verifier-dashboard/verify-pharmacist">
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" /> Verify
              </Button>
            </Link>
          </CardContent>
        </Card>
        
      </div>
    </DashboardLayout>
  )
}

