import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Device {
  id: string
  name: string
  status: "online" | "warning" | "offline"
  lat: number
  lng: number
  estate: string
  farm: string
  user: string
  lastSync: string
}

// Mock device data
const mockDevices: Device[] = [
  {
    id: "NPK-001",
    name: "NPK Sensor 001",
    status: "online",
    lat: -1.2921,
    lng: 36.8219,
    estate: "Green Valley Farm",
    farm: "North Field",
    user: "John Kamau",
    lastSync: "2 mins ago"
  },
  {
    id: "NPK-045",
    name: "NPK Sensor 045", 
    status: "offline",
    lat: -1.3057,
    lng: 36.8070,
    estate: "Sunrise Estate",
    farm: "East Block",
    user: "Mary Wanjiku",
    lastSync: "5 hours ago"
  },
  {
    id: "NPK-023",
    name: "NPK Sensor 023",
    status: "warning",
    lat: -1.2740,
    lng: 36.8540,
    estate: "Hill View Farm", 
    farm: "South Valley",
    user: "Peter Mwangi",
    lastSync: "1 hour ago"
  }
]

export function DeviceMap() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getMarkerColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'bg-success'
      case 'warning': return 'bg-warning'  
      case 'offline': return 'bg-destructive'
      default: return 'bg-muted-foreground'
    }
  }

  const getStatusBadgeColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return 'bg-success-light text-success border-success/20'
      case 'warning': return 'bg-warning-light text-warning-foreground border-warning/20'
      case 'offline': return 'bg-destructive-light text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  // Convert lat/lng to relative positions on our mock map
  const getDevicePosition = (device: Device) => {
    // Normalize coordinates to fit within a 400x300 area
    // Using Nairobi area bounds approximately
    const minLat = -1.31, maxLat = -1.27
    const minLng = 36.80, maxLng = 36.86
    
    const x = ((device.lng - minLng) / (maxLng - minLng)) * 350 + 25
    const y = ((maxLat - device.lat) / (maxLat - minLat)) * 250 + 25
    
    return { x: Math.max(25, Math.min(375, x)), y: Math.max(25, Math.min(275, y)) }
  }

  const filteredDevices = mockDevices.filter(device => 
    filterStatus === "all" || device.status === filterStatus
  )

  return (
    <Card className="col-span-4 border-card-border bg-gradient-surface shadow-custom-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Device Locations ({filteredDevices.length} devices)
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "online" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("online")}
              className="text-success"
            >
              Online
            </Button>
            <Button
              variant={filterStatus === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("warning")}
              className="text-warning"
            >
              Warning
            </Button>
            <Button
              variant={filterStatus === "offline" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("offline")}
              className="text-destructive"
            >
              Offline
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Mock Map Background */}
          <div className="h-96 w-full rounded-lg bg-gradient-to-br from-surface-light to-surface border border-border overflow-hidden">
            {/* Grid pattern for map appearance */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Mock geographic features */}
            <div className="absolute top-8 left-8 w-16 h-12 bg-primary/20 rounded-full opacity-30"></div>
            <div className="absolute bottom-16 right-12 w-20 h-8 bg-primary/15 rounded-lg opacity-40"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-6 bg-primary/10 rounded-full opacity-50"></div>
            
            {/* Device Markers */}
            {filteredDevices.map((device) => {
              const position = getDevicePosition(device)
              return (
                <button
                  key={device.id}
                  className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform cursor-pointer ${getMarkerColor(device.status)}`}
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedDevice(device)}
                  title={device.name}
                />
              )
            })}
          </div>
          
          {selectedDevice && (
            <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{selectedDevice.name}</h4>
                  <Badge className={getStatusBadgeColor(selectedDevice.status)}>
                    {selectedDevice.status}
                  </Badge>
                </div>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><span className="font-medium">Estate:</span> {selectedDevice.estate}</p>
                  <p><span className="font-medium">Farm:</span> {selectedDevice.farm}</p>
                  <p><span className="font-medium">User:</span> {selectedDevice.user}</p>
                  <p><span className="font-medium">Last Sync:</span> {selectedDevice.lastSync}</p>
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedDevice(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}