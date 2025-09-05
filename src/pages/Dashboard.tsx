import { 
  Users, 
  MapPin, 
  Cpu, 
  WifiOff, 
  HeadphonesIcon, 
  TrendingUp,
  Activity,
  Droplets
} from "lucide-react"
import { KPICard } from "@/components/kpi-card"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recentAlerts = [
  {
    id: 1,
    device: "NPK-001",
    farm: "Green Valley Farm",
    issue: "Low nitrogen levels detected",
    status: "warning" as const,
    time: "2 hours ago"
  },
  {
    id: 2,
    device: "NPK-045",
    farm: "Sunrise Estate",
    issue: "Device offline",
    status: "offline" as const,
    time: "5 hours ago"
  },
  {
    id: 3,
    device: "NPK-023",
    farm: "Hill View Farm",
    issue: "High pH levels",
    status: "warning" as const,
    time: "1 day ago"
  }
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your FarmFuture IoT platform
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-gradient-primary">
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Users"
          value="2,341"
          change="+12% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Active Estates"
          value="856"
          change="+8% from last month"
          changeType="positive"
          icon={<MapPin className="h-4 w-4" />}
        />
        <KPICard
          title="Connected Devices"
          value="3,247"
          change="+15% from last month"
          changeType="positive"
          icon={<Cpu className="h-4 w-4" />}
        />
        <KPICard
          title="Offline Devices"
          value="43"
          change="-5% from last week"
          changeType="positive"
          icon={<WifiOff className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Device Status Overview */}
        <Card className="col-span-4 border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Device Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Online Devices</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-gradient-success rounded-full" />
                  </div>
                  <span className="text-sm text-success font-medium">87%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Warning Status</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[8%] bg-warning rounded-full" />
                  </div>
                  <span className="text-sm text-warning font-medium">8%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Offline Devices</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[5%] bg-destructive rounded-full" />
                  </div>
                  <span className="text-sm text-destructive font-medium">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="col-span-3 border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-primary" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {alert.device} - {alert.farm}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {alert.issue}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {alert.time}
                    </p>
                  </div>
                  <StatusBadge status={alert.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NPK Analytics Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Nitrogen (N)</CardTitle>
            <Droplets className="h-4 w-4 text-npk-nitrogen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-npk-nitrogen">245 ppm</div>
            <p className="text-xs text-success">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Phosphorus (P)</CardTitle>
            <Droplets className="h-4 w-4 text-npk-phosphorus" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-npk-phosphorus">89 ppm</div>
            <p className="text-xs text-muted-foreground">
              -0.5% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Potassium (K)</CardTitle>
            <Droplets className="h-4 w-4 text-npk-potassium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-npk-potassium">178 ppm</div>
            <p className="text-xs text-success">
              +1.3% from last week
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}