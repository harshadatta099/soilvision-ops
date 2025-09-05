import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  HeadphonesIcon, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink
} from "lucide-react"

interface SupportTicket {
  id: string
  user: string
  device: string
  status: "new" | "assigned" | "in_progress" | "completed"
  priority: "low" | "medium" | "high" | "critical"
  technician?: string
  created: string
  slaStatus: "on_time" | "at_risk" | "overdue"
}

const mockTickets: SupportTicket[] = [
  {
    id: "TKT-001",
    user: "John Kamau",
    device: "NPK-045",
    status: "assigned",
    priority: "high",
    technician: "James Mwangi",
    created: "2 hours ago",
    slaStatus: "on_time"
  },
  {
    id: "TKT-002", 
    user: "Mary Wanjiku",
    device: "NPK-023",
    status: "in_progress",
    priority: "medium",
    technician: "Sarah Njeri",
    created: "1 day ago",
    slaStatus: "at_risk"
  },
  {
    id: "TKT-003",
    user: "Peter Mwangi",
    device: "NPK-078",
    status: "new",
    priority: "critical",
    created: "30 mins ago",
    slaStatus: "on_time"
  }
]

export function SupportOverview() {
  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue/20'
      case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow/20'
      case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange/20'
      case 'completed': return 'bg-success-light text-success border-success/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'critical': return 'bg-destructive-light text-destructive'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getSLAIcon = (slaStatus: SupportTicket['slaStatus']) => {
    switch (slaStatus) {
      case 'on_time': return <CheckCircle className="h-4 w-4 text-success" />
      case 'at_risk': return <Clock className="h-4 w-4 text-warning" />
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-destructive" />
    }
  }

  return (
    <Card className="col-span-3 border-card-border bg-gradient-surface shadow-custom-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HeadphonesIcon className="h-5 w-5 text-primary" />
            Support Tickets
          </CardTitle>
          <Button size="sm" variant="outline">
            View All
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTickets.map((ticket) => (
            <div key={ticket.id} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{ticket.id}</span>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.replace('_', ' ')}
                  </Badge>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
                {getSLAIcon(ticket.slaStatus)}
              </div>
              
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">User:</span> {ticket.user}</p>
                <p><span className="text-muted-foreground">Device:</span> {ticket.device}</p>
                {ticket.technician && (
                  <p><span className="text-muted-foreground">Technician:</span> {ticket.technician}</p>
                )}
                <p className="text-xs text-muted-foreground">Created {ticket.created}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}