import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  AlertTriangle, 
  TrendingUp,
  ExternalLink
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  type: "device" | "addon"
  inStock: number
  assigned: number
  threshold: number
  recentTransactions: number
}

const mockInventory: InventoryItem[] = [
  {
    id: "NPK-SENSOR",
    name: "NPK Sensor Pro",
    type: "device", 
    inStock: 45,
    assigned: 123,
    threshold: 20,
    recentTransactions: 8
  },
  {
    id: "SOIL-PROBE", 
    name: "Soil Probe Kit",
    type: "addon",
    inStock: 12,
    assigned: 67,
    threshold: 15,
    recentTransactions: 3
  },
  {
    id: "WEATHER-STATION",
    name: "Weather Station",
    type: "device",
    inStock: 8,
    assigned: 34,
    threshold: 10,
    recentTransactions: 2
  }
]

export function InventorySnapshot() {
  const getLowStockItems = () => {
    return mockInventory.filter(item => item.inStock <= item.threshold)
  }

  const getTotalInStock = () => {
    return mockInventory.reduce((sum, item) => sum + item.inStock, 0)
  }

  const getTotalAssigned = () => {
    return mockInventory.reduce((sum, item) => sum + item.assigned, 0)
  }

  const lowStockItems = getLowStockItems()

  return (
    <Card className="col-span-2 border-card-border bg-gradient-surface shadow-custom-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Inventory Status
          </CardTitle>
          <Button size="sm" variant="outline">
            Manage
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{getTotalInStock()}</div>
              <div className="text-sm text-muted-foreground">In Stock</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success">{getTotalAssigned()}</div>
              <div className="text-sm text-muted-foreground">Deployed</div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="p-3 bg-warning-light border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning-foreground">
                  Low Stock Alert
                </span>
              </div>
              <div className="space-y-1">
                {lowStockItems.map(item => (
                  <div key={item.id} className="text-xs text-warning-foreground">
                    {item.name}: {item.inStock} remaining (threshold: {item.threshold})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Items */}
          <div className="space-y-3">
            {mockInventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 border border-border rounded">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Stock: {item.inStock} | Deployed: {item.assigned}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {item.recentTransactions}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}