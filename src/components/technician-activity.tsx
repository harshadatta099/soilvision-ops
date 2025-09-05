import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Wrench, 
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react"

interface Technician {
  id: string
  name: string
  status: "active" | "break" | "offline"
  openTickets: number
  completedThisWeek: number
  location?: string
}

const mockTechnicians: Technician[] = [
  {
    id: "TECH-001",
    name: "James Mwangi",
    status: "active",
    openTickets: 3,
    completedThisWeek: 12,
    location: "Kiambu"
  },
  {
    id: "TECH-002", 
    name: "Sarah Njeri",
    status: "active",
    openTickets: 2,
    completedThisWeek: 8,
    location: "Nairobi"
  },
  {
    id: "TECH-003",
    name: "David Ochieng",
    status: "break",
    openTickets: 1,
    completedThisWeek: 15,
    location: "Nakuru"
  },
  {
    id: "TECH-004",
    name: "Grace Wambui",
    status: "offline",
    openTickets: 4,
    completedThisWeek: 6,
  }
]

export function TechnicianActivity() {
  const getStatusColor = (status: Technician['status']) => {
    switch (status) {
      case 'active': return 'bg-success-light text-success border-success/20'
      case 'break': return 'bg-warning-light text-warning-foreground border-warning/20'
      case 'offline': return 'bg-muted text-muted-foreground border-border'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const activeTechnicians = mockTechnicians.filter(t => t.status === 'active').length
  const totalOpenTickets = mockTechnicians.reduce((sum, t) => sum + t.openTickets, 0)
  const totalCompletedThisWeek = mockTechnicians.reduce((sum, t) => sum + t.completedThisWeek, 0)

  return (
    <Card className="col-span-2 border-card-border bg-gradient-surface shadow-custom-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            Technician Activity
          </CardTitle>
          <Button size="sm" variant="outline">
            Manage
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-muted/30 rounded">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-success" />
                <span className="text-lg font-bold text-success">{activeTechnicians}</span>
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="p-2 bg-muted/30 rounded">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-lg font-bold text-warning">{totalOpenTickets}</span>
              </div>
              <div className="text-xs text-muted-foreground">Open</div>
            </div>
            <div className="p-2 bg-muted/30 rounded">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-lg font-bold text-primary">{totalCompletedThisWeek}</span>
              </div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </div>

          {/* Technician List */}
          <div className="space-y-2">
            {mockTechnicians.map((technician) => (
              <div key={technician.id} className="flex items-center justify-between p-2 border border-border rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{technician.name}</span>
                    <Badge className={getStatusColor(technician.status)}>
                      {technician.status}
                    </Badge>
                  </div>
                  {technician.location && (
                    <div className="text-xs text-muted-foreground">
                      📍 {technician.location}
                    </div>
                  )}
                </div>
                <div className="text-right text-xs space-y-1">
                  <div className="text-warning font-medium">
                    {technician.openTickets} open
                  </div>
                  <div className="text-muted-foreground">
                    {technician.completedThisWeek} done
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}