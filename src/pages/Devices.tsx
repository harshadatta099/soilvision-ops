import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { 
  Search, 
  Filter, 
  Download,
  MapPin,
  Battery,
  Wifi,
  AlertTriangle,
  Settings,
  MoreHorizontal
} from "lucide-react"

interface Device {
  id: string
  name: string
  type: string
  estate: string
  farm: string
  user: string
  status: "online" | "offline" | "warning" | "idle"
  batteryLevel: number
  lastSync: string
  location: { lat: number; lng: number }
  firmwareVersion: string
}

const mockDevices: Device[] = [
  {
    id: "NPK-001",
    name: "NPK Sensor Alpha",
    type: "NPK Sensor",
    estate: "Green Valley Estate",
    farm: "North Farm",
    user: "John Kamau",
    status: "online",
    batteryLevel: 85,
    lastSync: "2 mins ago",
    location: { lat: -1.2921, lng: 36.8219 },
    firmwareVersion: "v2.1.3"
  },
  {
    id: "NPK-002", 
    name: "NPK Sensor Beta",
    type: "NPK Sensor",
    estate: "Sunrise Estate",
    farm: "East Farm",
    user: "Mary Wanjiku",
    status: "warning",
    batteryLevel: 15,
    lastSync: "1 hour ago",
    location: { lat: -1.2855, lng: 36.8231 },
    firmwareVersion: "v2.0.1"
  },
  {
    id: "NPK-003",
    name: "NPK Sensor Gamma", 
    type: "NPK Sensor",
    estate: "Highland Estate",
    farm: "West Farm",
    user: "Peter Mwangi",
    status: "offline",
    batteryLevel: 0,
    lastSync: "2 days ago",
    location: { lat: -1.2801, lng: 36.8156 },
    firmwareVersion: "v1.9.2"
  },
  {
    id: "WTH-001",
    name: "Weather Station Alpha",
    type: "Weather Station", 
    estate: "Green Valley Estate",
    farm: "South Farm",
    user: "Sarah Njeri",
    status: "online",
    batteryLevel: 92,
    lastSync: "5 mins ago",
    location: { lat: -1.2956, lng: 36.8187 },
    firmwareVersion: "v3.0.1"
  }
]

export default function Devices() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.estate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    const matchesType = typeFilter === "all" || device.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-success"
    if (level > 20) return "text-warning" 
    return "text-destructive"
  }

  const getBatteryIcon = (level: number) => {
    if (level === 0) return <AlertTriangle className="h-4 w-4 text-destructive" />
    return <Battery className={`h-4 w-4 ${getBatteryColor(level)}`} />
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Device Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage IoT devices across all farms
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            Add Device
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDevices.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Devices</CardTitle>
            <Wifi className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {mockDevices.filter(d => d.status === "online").length}
            </div>
            <p className="text-xs text-muted-foreground">85% uptime</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Devices</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockDevices.filter(d => d.status === "warning").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline Devices</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {mockDevices.filter(d => d.status === "offline").length}
            </div>
            <p className="text-xs text-muted-foreground">Require service</p>
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
                placeholder="Search devices..."
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
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Device Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="NPK Sensor">NPK Sensor</SelectItem>
                <SelectItem value="Weather Station">Weather Station</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Devices Table */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle>Devices ({filteredDevices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Firmware</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">{device.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{device.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{device.estate}</div>
                        <div className="text-xs text-muted-foreground">{device.farm}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{device.user}</TableCell>
                  <TableCell>
                    <StatusBadge status={device.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getBatteryIcon(device.batteryLevel)}
                      <span className={`text-sm ${getBatteryColor(device.batteryLevel)}`}>
                        {device.batteryLevel}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {device.lastSync}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {device.firmwareVersion}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}