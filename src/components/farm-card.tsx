import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Crop,
  Ruler,
  Mountain,
  Cpu,
  Settings,
  Activity,
  Battery
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Farm } from "./estate-card"

interface FarmCardProps {
  farm: Farm
  onEdit?: () => void
}

export function FarmCard({ farm, onEdit }: FarmCardProps) {
  const getStatusColor = (status: Farm['status']) => {
    switch (status) {
      case 'active': return 'bg-success-light text-success border-success/20'
      case 'maintenance': return 'bg-warning-light text-warning-foreground border-warning/20'
      case 'inactive': return 'bg-muted text-muted-foreground border-border'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success'
      case 'warning': return 'text-warning'
      case 'offline': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const onlineDevices = farm.devices.filter(device => device.status === 'online').length
  const deviceHealthPercentage = farm.devices.length > 0 
    ? Math.round((onlineDevices / farm.devices.length) * 100) 
    : 0

  return (
    <Card className="border-border/50 bg-background/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h5 className="font-medium">{farm.name}</h5>
              <Badge className={getStatusColor(farm.status)}>
                {farm.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="space-y-1">
                <p className="flex items-center gap-1">
                  <Ruler className="h-3 w-3" />
                  {farm.size} hectares
                </p>
                <p className="flex items-center gap-1">
                  <Mountain className="h-3 w-3" />
                  {farm.soilType}
                </p>
              </div>
              <div className="space-y-1">
                <p className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {farm.coordinates.lat.toFixed(4)}, {farm.coordinates.lng.toFixed(4)}
                </p>
                <p className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  {farm.devices.length} devices
                </p>
              </div>
            </div>

            {/* Crop Types */}
            <div className="mt-2">
              <div className="flex items-center gap-1 mb-1">
                <Crop className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Crops:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {farm.cropTypes.map((crop, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs h-5 px-2"
                  >
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button 
            size="sm" 
            variant="ghost"
            onClick={onEdit}
            className="h-7 w-7 p-0"
          >
            <Settings className="h-3 w-3" />
          </Button>
        </div>

        {/* Device Status Summary */}
        <div className="border-t pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Device Health</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all",
                    deviceHealthPercentage >= 80 ? "bg-success" : 
                    deviceHealthPercentage >= 60 ? "bg-warning" : "bg-destructive"
                  )}
                  style={{ width: `${deviceHealthPercentage}%` }}
                />
              </div>
              <span className="text-xs font-medium">{deviceHealthPercentage}%</span>
            </div>
          </div>

          {/* Device List */}
          <div className="space-y-1">
            {farm.devices.slice(0, 3).map((device) => (
              <div key={device.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Activity className={cn("h-2 w-2", getDeviceStatusColor(device.status))} />
                  <span>{device.name}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1">
                    {device.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {device.batteryLevel && (
                    <div className="flex items-center gap-1">
                      <Battery className="h-2 w-2" />
                      {device.batteryLevel}%
                    </div>
                  )}
                  <span>{device.lastSync}</span>
                </div>
              </div>
            ))}
            
            {farm.devices.length > 3 && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                +{farm.devices.length - 3} more devices
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}