import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter } from "lucide-react"

// Declare global google object
declare global {
  interface Window {
    google: typeof google;
  }
}

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
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getMarkerColor = (status: Device['status']) => {
    switch (status) {
      case 'online': return '#22c55e' // green
      case 'warning': return '#f59e0b' // yellow  
      case 'offline': return '#ef4444' // red
      default: return '#6b7280' // gray
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

  useEffect(() => {
    if (!mapRef.current) return

    const loader = new Loader({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with actual key
      version: "weekly",
    })

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center: { lat: -1.2921, lng: 36.8219 }, // Nairobi area
        zoom: 11,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "weight": "2.00" }]
          },
          {
            "featureType": "all", 
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#9c9c9c" }]
          }
        ]
      })

      setMap(mapInstance)

      // Add device markers
      mockDevices.forEach((device) => {
        if (filterStatus !== "all" && device.status !== filterStatus) return

        const marker = new google.maps.Marker({
          position: { lat: device.lat, lng: device.lng },
          map: mapInstance,
          title: device.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getMarkerColor(device.status),
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: '#ffffff'
          }
        })

        marker.addListener('click', () => {
          setSelectedDevice(device)
        })
      })
    })
  }, [filterStatus])

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
          <div 
            ref={mapRef} 
            className="h-96 w-full rounded-lg bg-muted"
          />
          
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