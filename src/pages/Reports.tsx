import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  MapPin, 
  Cpu,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar
} from "lucide-react"

// Mock data for reports
const devicePerformanceData = [
  { month: "Jan", online: 85, warning: 10, offline: 5 },
  { month: "Feb", online: 88, warning: 8, offline: 4 },
  { month: "Mar", online: 82, warning: 12, offline: 6 },
  { month: "Apr", online: 90, warning: 7, offline: 3 },
  { month: "May", online: 87, warning: 9, offline: 4 },
  { month: "Jun", online: 92, warning: 6, offline: 2 }
]

const userActivityData = [
  { date: "2024-09-01", activeUsers: 45, newRegistrations: 3, loginSessions: 120 },
  { date: "2024-09-02", activeUsers: 52, newRegistrations: 5, loginSessions: 140 },
  { date: "2024-09-03", activeUsers: 48, newRegistrations: 2, loginSessions: 135 },
  { date: "2024-09-04", activeUsers: 58, newRegistrations: 7, loginSessions: 165 },
  { date: "2024-09-05", activeUsers: 55, newRegistrations: 4, loginSessions: 155 },
  { date: "2024-09-06", activeUsers: 62, newRegistrations: 8, loginSessions: 180 },
  { date: "2024-09-07", activeUsers: 59, newRegistrations: 6, loginSessions: 170 }
]

const estateProductivityData = [
  { name: "Green Valley Farm", area: 1200, devices: 45, productivity: 85, revenue: 125000 },
  { name: "Sunrise Estate", area: 800, devices: 32, productivity: 78, revenue: 95000 },
  { name: "Hill View Farm", area: 1500, devices: 58, productivity: 92, revenue: 165000 },
  { name: "Golden Fields", area: 950, devices: 38, productivity: 80, revenue: 110000 },
  { name: "Valley Springs", area: 1100, devices: 42, productivity: 88, revenue: 135000 }
]

const supportTicketsData = [
  { category: "Device Issues", count: 45, resolved: 38, pending: 7 },
  { category: "Connectivity", count: 32, resolved: 28, pending: 4 },
  { category: "Data Sync", count: 28, resolved: 25, pending: 3 },
  { category: "User Account", count: 18, resolved: 16, pending: 2 },
  { category: "Billing", count: 12, resolved: 11, pending: 1 }
]

const recentReports = [
  {
    id: "RPT-001",
    name: "Monthly Device Performance Report",
    type: "Device Analytics",
    generatedBy: "System",
    generatedAt: "2024-09-08 09:30",
    status: "completed",
    size: "2.4 MB"
  },
  {
    id: "RPT-002", 
    name: "Estate Productivity Summary",
    type: "Estate Analytics",
    generatedBy: "John Kamau",
    generatedAt: "2024-09-07 14:15",
    status: "completed",
    size: "1.8 MB"
  },
  {
    id: "RPT-003",
    name: "User Activity Report",
    type: "User Analytics", 
    generatedBy: "System",
    generatedAt: "2024-09-06 08:00",
    status: "completed",
    size: "950 KB"
  },
  {
    id: "RPT-004",
    name: "Support Tickets Analysis",
    type: "Support Analytics",
    generatedBy: "Mary Wanjiku",
    generatedAt: "2024-09-05 16:45",
    status: "processing",
    size: "-"
  }
]

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))']

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success-light text-success border-success/20"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case "processing":
        return <Badge className="bg-warning-light text-warning-foreground border-warning/20"><Clock className="w-3 h-3 mr-1" />Processing</Badge>
      case "failed":
        return <Badge className="bg-destructive-light text-destructive border-destructive/20"><AlertTriangle className="w-3 h-3 mr-1" />Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredReports = recentReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || report.type.toLowerCase().includes(filterType.toLowerCase())
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate and manage comprehensive reports across your platform</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Currently processing</p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Volume</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2GB</div>
              <p className="text-xs text-muted-foreground">Total data processed</p>
            </CardContent>
          </Card>

          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">Report completion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics Reports</TabsTrigger>
            <TabsTrigger value="operational">Operational Reports</TabsTrigger>
            <TabsTrigger value="financial">Financial Reports</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Performance Chart */}
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Device Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={devicePerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="online" stackId="a" fill="hsl(var(--success))" />
                      <Bar dataKey="warning" stackId="a" fill="hsl(var(--warning))" />
                      <Bar dataKey="offline" stackId="a" fill="hsl(var(--destructive))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Activity Chart */}
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Activity Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                      <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="loginSessions" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Estate Productivity Table */}
            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Estate Productivity Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estate Name</TableHead>
                      <TableHead>Area (Acres)</TableHead>
                      <TableHead>Devices</TableHead>
                      <TableHead>Productivity %</TableHead>
                      <TableHead>Revenue (KES)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estateProductivityData.map((estate) => (
                      <TableRow key={estate.name}>
                        <TableCell className="font-medium">{estate.name}</TableCell>
                        <TableCell>{estate.area.toLocaleString()}</TableCell>
                        <TableCell>{estate.devices}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-muted rounded-full h-2 mr-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${estate.productivity}%` }}
                              ></div>
                            </div>
                            {estate.productivity}%
                          </div>
                        </TableCell>
                        <TableCell>KES {estate.revenue.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operational" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Support Tickets Distribution */}
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle>Support Tickets by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={supportTicketsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {supportTicketsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* System Health Metrics */}
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle>System Health Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Server Uptime</span>
                    <span className="text-sm font-medium">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync Success</span>
                    <span className="text-sm font-medium">97.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Device Connectivity</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">&lt; 200ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <span className="text-sm font-medium">0.2%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹2,45,000</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle>Subscription Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹1,89,000</div>
                  <p className="text-xs text-muted-foreground">Monthly recurring</p>
                </CardContent>
              </Card>
              
              <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
                <CardHeader>
                  <CardTitle>Device Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹56,000</div>
                  <p className="text-xs text-muted-foreground">Hardware revenue</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="device">Device Analytics</SelectItem>
                  <SelectItem value="estate">Estate Analytics</SelectItem>
                  <SelectItem value="user">User Analytics</SelectItem>
                  <SelectItem value="support">Support Analytics</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerWithRange />
            </div>

            {/* Reports History Table */}
            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>{report.generatedAt}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}