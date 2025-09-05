import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Cpu, 
  Users, 
  TreePine,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FarmCard } from "./farm-card"

export interface Farm {
  id: string
  name: string
  size: number // in hectares
  soilType: string
  cropTypes: string[]
  coordinates: { lat: number; lng: number }
  devices: Device[]
  status: "active" | "inactive" | "maintenance"
}

export interface Device {
  id: string
  name: string
  type: string
  status: "online" | "offline" | "warning"
  lastSync: string
  batteryLevel?: number
}

export interface Estate {
  id: string
  name: string
  owner: string
  location: string
  totalArea: number
  establishedDate: string
  farms: Farm[]
  status: "active" | "inactive"
  contactEmail: string
  phoneNumber: string
}

interface EstateCardProps {
  estate: Estate
  onEditEstate?: (estate: Estate) => void
  onAddFarm?: (estateId: string) => void
  onEditFarm?: (farm: Farm) => void
}

export function EstateCard({ estate, onEditEstate, onAddFarm, onEditFarm }: EstateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const totalDevices = estate.farms.reduce((sum, farm) => sum + farm.devices.length, 0)
  const onlineDevices = estate.farms.reduce((sum, farm) => 
    sum + farm.devices.filter(device => device.status === 'online').length, 0
  )
  const activeFarms = estate.farms.filter(farm => farm.status === 'active').length

  const getStatusColor = (status: Estate['status']) => {
    return status === 'active' 
      ? 'bg-success-light text-success border-success/20'
      : 'bg-muted text-muted-foreground border-border'
  }

  return (
    <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto hover:bg-transparent"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              <CardTitle className="text-lg">{estate.name}</CardTitle>
              <Badge className={getStatusColor(estate.status)}>
                {estate.status}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground ml-7">
              <p className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Owner: {estate.owner}
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {estate.location}
              </p>
              <p>Total Area: {estate.totalArea} hectares</p>
              <p>Established: {estate.establishedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onEditEstate?.(estate)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Estate Stats */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-primary">{estate.farms.length}</div>
            <div className="text-xs text-muted-foreground">Total Farms</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-success">{activeFarms}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded">
            <div className="text-lg font-bold text-primary">{totalDevices}</div>
            <div className="text-xs text-muted-foreground">Devices</div>
          </div>
          <div className="text-center p-2 bg-muted/30 rounded">
            <div className={cn(
              "text-lg font-bold",
              onlineDevices === totalDevices ? "text-success" : "text-warning"
            )}>
              {onlineDevices}/{totalDevices}
            </div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
        </div>

        {/* Expanded Farm List */}
        {isExpanded && (
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <TreePine className="h-4 w-4" />
                Farms ({estate.farms.length})
              </h4>
              <Button 
                size="sm" 
                onClick={() => onAddFarm?.(estate.id)}
                className="h-7"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Farm
              </Button>
            </div>
            
            <div className="space-y-2">
              {estate.farms.map((farm) => (
                <FarmCard 
                  key={farm.id} 
                  farm={farm} 
                  onEdit={() => onEditFarm?.(farm)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}