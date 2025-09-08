import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Download,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar
} from "lucide-react"

const deviceStatusData = [
  { name: 'Online', value: 85, color: 'hsl(var(--success))' },
  { name: 'Warning', value: 10, color: 'hsl(var(--warning))' },
  { name: 'Offline', value: 5, color: 'hsl(var(--destructive))' }
]

const monthlyTicketsData = [
  { month: 'Jan', tickets: 45, resolved: 42 },
  { month: 'Feb', tickets: 52, resolved: 48 },
  { month: 'Mar', tickets: 38, resolved: 36 },
  { month: 'Apr', tickets: 61, resolved: 58 },
  { month: 'May', tickets: 55, resolved: 53 },
  { month: 'Jun', tickets: 67, resolved: 62 }
]

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1350 },
  { month: 'Mar', users: 1280 },
  { month: 'Apr', users: 1580 },
  { month: 'May', users: 1750 },
  { month: 'Jun', users: 1920 }
]

const deviceDeploymentData = [
  { estate: 'Green Valley', devices: 12, online: 11 },
  { estate: 'Sunrise Estate', devices: 8, online: 7 },
  { estate: 'Highland Estate', devices: 15, online: 13 },
  { estate: 'Valley View', devices: 6, online: 6 },
  { estate: 'Mountain Ridge', devices: 10, online: 8 }
]

export default function Analytics() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h2>
          <p className="text-muted-foreground">
            Comprehensive system analytics and performance reports
          </p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 2.1M</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,920</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.2%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Device Analytics</TabsTrigger>
          <TabsTrigger value="support">Support Analytics</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Monthly User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Device Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {deviceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {deviceStatusData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader>
              <CardTitle>Device Deployment by Estate</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deviceDeploymentData}>
                  <XAxis dataKey="estate" />
                  <YAxis />
                  <Bar dataKey="devices" fill="hsl(var(--primary))" name="Total Devices" />
                  <Bar dataKey="online" fill="hsl(var(--success))" name="Online Devices" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
            <CardHeader>
              <CardTitle>Support Tickets Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyTicketsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="tickets" fill="hsl(var(--warning))" name="Total Tickets" />
                  <Bar dataKey="resolved" fill="hsl(var(--success))" name="Resolved Tickets" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="text-sm">New Users (30 days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+127</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="text-sm">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">2.3%</div>
                <p className="text-xs text-muted-foreground">-0.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
              <CardHeader>
                <CardTitle className="text-sm">Avg Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5 min</div>
                <p className="text-xs text-muted-foreground">+2.1 min from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}