import { 
  Users, 
  MapPin, 
  Cpu, 
  WifiOff, 
  HeadphonesIcon, 
  TrendingUp,
  Activity,
  Package,
  AlertTriangle,
  FileText
} from "lucide-react"
import { KPICard } from "@/components/kpi-card"
import { StatusBadge } from "@/components/status-badge"
import { DeviceMap } from "@/components/device-map"
import { SupportOverview } from "@/components/support-overview"
import { InventorySnapshot } from "@/components/inventory-snapshot"
import { TechnicianActivity } from "@/components/technician-activity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const operationalAlerts = [
  {
    id: 1,
    title: "Multiple devices offline in Kiambu region",
    type: "critical" as const,
    description: "5 devices have been offline for >24 hours",
    time: "1 hour ago",
    action: "Assign technician"
  },
  {
    id: 2,
    title: "High ticket backlog for Green Valley Estate",
    type: "warning" as const,
    description: "8 open tickets, SLA at risk",
    time: "3 hours ago",
    action: "Escalate to manager"
  },
  {
    id: 3,
    title: "Low inventory: NPK Sensors",
    type: "warning" as const,
    description: "Only 12 units remaining (threshold: 15)",
    time: "6 hours ago",
    action: "Reorder stock"
  },
  {
    id: 4,
    title: "Technician capacity exceeded",
    type: "info" as const,
    description: "James Mwangi has 8 open tickets",
    time: "1 day ago",
    action: "Redistribute load"
  }
]

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Super Admin Dashboard</h2>
          <p className="text-muted-foreground">
            FarmFuture IoT Operations Center - System Health & Management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            User Report
          </Button>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Device Report
          </Button>
          <Button className="bg-gradient-primary">
            <HeadphonesIcon className="h-4 w-4 mr-2" />
            Support Report
          </Button>
        </div>
      </div>

      {/* System Overview KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <KPICard
          title="Total Users"
          value="2,341"
          change="+12% from last month"
          changeType="positive"
          icon={<Users className="h-4 w-4" />}
          className="col-span-1"
        />
        <KPICard
          title="Active Estates"
          value="856"
          change="+8% from last month"
          changeType="positive"
          icon={<MapPin className="h-4 w-4" />}
          className="col-span-1"
        />
        <KPICard
          title="Deployed Devices"
          value="3,247"
          change="+15% from last month"
          changeType="positive"
          icon={<Cpu className="h-4 w-4" />}
          className="col-span-1"
        />
        <KPICard
          title="Offline Devices"
          value="43"
          change="-5% from last week"
          changeType="positive"
          icon={<WifiOff className="h-4 w-4 text-destructive" />}
          className="col-span-1"
        />
        <KPICard
          title="Open Tickets"
          value="127"
          change="+23% from last week"
          changeType="negative"
          icon={<HeadphonesIcon className="h-4 w-4 text-warning" />}
          className="col-span-1"
        />
        <KPICard
          title="Available Inventory"
          value="189"
          change="-8% from last month"
          changeType="neutral"
          icon={<Package className="h-4 w-4" />}
          className="col-span-1"
        />
        <KPICard
          title="Active Technicians"
          value="12"
          change="Same as yesterday"
          changeType="neutral"
          icon={<Users className="h-4 w-4 text-primary" />}
          className="col-span-1"
        />
      </div>

      {/* Main Google Maps Device View */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DeviceMap />
        <SupportOverview />
      </div>

      {/* Secondary Operational Panels */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Device Health Chart */}
        <Card className="col-span-3 border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Device Health Monitoring
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
                  <span className="text-sm text-success font-medium">87% (2,825)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Warning Status</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[8%] bg-warning rounded-full" />
                  </div>
                  <span className="text-sm text-warning font-medium">8% (259)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Offline Devices</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[5%] bg-destructive rounded-full" />
                  </div>
                  <span className="text-sm text-destructive font-medium">5% (163)</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Trend (7 days)</div>
                <div className="text-sm">
                  <span className="text-success">↗ +2.3% online</span> • 
                  <span className="text-warning"> ↑ +0.8% warnings</span> • 
                  <span className="text-destructive"> ↓ -1.1% offline</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <TechnicianActivity />
        <InventorySnapshot />
      </div>

      {/* Operational Alerts & Quick Actions */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Operational Alerts ({operationalAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {operationalAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <StatusBadge 
                      status={alert.type === 'critical' ? 'offline' : alert.type === 'warning' ? 'warning' : 'idle'} 
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      {alert.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}