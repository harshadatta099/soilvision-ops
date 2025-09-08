import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Filter, 
  Download,
  HeadphonesIcon,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  Plus
} from "lucide-react"

interface SupportTicket {
  id: string
  title: string
  user: string
  device: string
  estate: string
  status: "new" | "assigned" | "in_progress" | "completed" | "closed"
  priority: "low" | "medium" | "high" | "critical"
  technician?: string
  created: string
  updated: string
  slaStatus: "on_time" | "at_risk" | "overdue"
  category: string
  description: string
}

const mockTickets: SupportTicket[] = [
  {
    id: "TKT-001",
    title: "NPK Sensor not responding",
    user: "John Kamau",
    device: "NPK-045",
    estate: "Green Valley Estate",
    status: "assigned",
    priority: "high",
    technician: "James Mwangi",
    created: "2024-01-15",
    updated: "2 hours ago",
    slaStatus: "on_time",
    category: "Hardware Issue",
    description: "Device stopped sending data after heavy rainfall"
  },
  {
    id: "TKT-002",
    title: "Battery replacement needed",
    user: "Mary Wanjiku",
    device: "NPK-023",
    estate: "Sunrise Estate", 
    status: "in_progress",
    priority: "medium",
    technician: "Sarah Njeri",
    created: "2024-01-14",
    updated: "1 day ago",
    slaStatus: "at_risk",
    category: "Maintenance",
    description: "Battery level critically low, needs immediate replacement"
  },
  {
    id: "TKT-003", 
    title: "Calibration required",
    user: "Peter Mwangi",
    device: "NPK-078",
    estate: "Highland Estate",
    status: "new",
    priority: "critical",
    technician: undefined,
    created: "2024-01-15",
    updated: "30 mins ago", 
    slaStatus: "on_time",
    category: "Calibration",
    description: "Sensor readings appear inaccurate, calibration needed"
  },
  {
    id: "TKT-004",
    title: "Installation support",
    user: "Grace Wanjiku", 
    device: "NPK-089",
    estate: "Valley View Estate",
    status: "completed",
    priority: "low",
    technician: "Michael Otieno",
    created: "2024-01-12",
    updated: "3 days ago",
    slaStatus: "on_time", 
    category: "Installation",
    description: "Customer needs help with device installation"
  }
]

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue/20'
      case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow/20'
      case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange/20'
      case 'completed': return 'bg-success-light text-success border-success/20'
      case 'closed': return 'bg-muted text-muted-foreground border-border'
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

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
    const matchesTab = activeTab === "all" || ticket.status === activeTab
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTab
  })

  const getTabCounts = () => {
    return {
      all: mockTickets.length,
      new: mockTickets.filter(t => t.status === 'new').length,
      assigned: mockTickets.filter(t => t.status === 'assigned').length,
      in_progress: mockTickets.filter(t => t.status === 'in_progress').length,
      completed: mockTickets.filter(t => t.status === 'completed').length
    }
  }

  const tabCounts = getTabCounts()

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Support Tickets</h2>
          <p className="text-muted-foreground">
            Manage customer support requests and technician assignments
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTickets.length}</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockTickets.filter(t => !['completed', 'closed'].includes(t.status)).length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 days</div>
            <p className="text-xs text-muted-foreground">-0.5 from last week</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">92%</div>
            <p className="text-xs text-muted-foreground">Within SLA targets</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table with Tabs */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
              <TabsTrigger value="new">New ({tabCounts.new})</TabsTrigger>
              <TabsTrigger value="assigned">Assigned ({tabCounts.assigned})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({tabCounts.in_progress})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({tabCounts.completed})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.title}</div>
                          <div className="text-sm text-muted-foreground">{ticket.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm">{ticket.user}</div>
                            <div className="text-xs text-muted-foreground">{ticket.estate}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{ticket.device}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {ticket.technician || <span className="text-muted-foreground">Unassigned</span>}
                      </TableCell>
                      <TableCell>
                        {getSLAIcon(ticket.slaStatus)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {ticket.updated}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}