import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MapPin, 
  TreePine, 
  Cpu, 
  Activity,
  TrendingUp,
  Users
} from "lucide-react"

interface EstatesOverviewProps {
  totalEstates: number
  activeEstates: number
  totalFarms: number
  totalDevices: number
  onlineDevices: number
  totalUsers: number
}

export function EstatesOverview({ 
  totalEstates, 
  activeEstates, 
  totalFarms, 
  totalDevices, 
  onlineDevices,
  totalUsers 
}: EstatesOverviewProps) {
  const deviceHealthPercentage = totalDevices > 0 
    ? Math.round((onlineDevices / totalDevices) * 100) 
    : 0

  const estateUtilization = totalEstates > 0 
    ? Math.round((activeEstates / totalEstates) * 100)
    : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Estates</CardTitle>
          <MapPin className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalEstates}</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 text-success" />
            <span className="text-success">+8% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Estates</CardTitle>
          <Activity className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{activeEstates}</div>
          <div className="text-xs text-muted-foreground">
            {estateUtilization}% utilization rate
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
          <TreePine className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalFarms}</div>
          <div className="text-xs text-muted-foreground">
            Avg {totalFarms > 0 ? (totalFarms / totalEstates).toFixed(1) : 0} per estate
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">IoT Devices</CardTitle>
          <Cpu className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalDevices}</div>
          <div className="text-xs text-success">
            {onlineDevices} online ({deviceHealthPercentage}%)
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Device Health</CardTitle>
          <Activity className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{deviceHealthPercentage}%</div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
            <div 
              className="bg-success h-1.5 rounded-full transition-all" 
              style={{ width: `${deviceHealthPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{totalUsers}</div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 text-success" />
            <span className="text-success">+12% growth</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}