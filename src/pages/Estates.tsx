import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Filter, 
  Plus, 
  MapPin,
  SortAsc
} from "lucide-react"
import { EstatesOverview } from "@/components/estates-overview"
import { EstateCard, Estate } from "@/components/estate-card"

// Mock data - in real app this would come from API
const mockEstates: Estate[] = [
  {
    id: "EST-001",
    name: "Green Valley Estate",
    owner: "John Kamau",
    location: "Kiambu County, Kenya",
    totalArea: 250,
    establishedDate: "2019-03-15",
    status: "active",
    contactEmail: "john@greenvalley.co.ke",
    phoneNumber: "+254-700-123456",
    farms: [
      {
        id: "FARM-001",
        name: "North Field",
        size: 75,
        soilType: "Clay Loam",
        cropTypes: ["Maize", "Beans"],
        coordinates: { lat: -1.2921, lng: 36.8219 },
        status: "active",
        devices: [
          {
            id: "NPK-001",
            name: "NPK Sensor 001",
            type: "NPK Monitor",
            status: "online",
            lastSync: "2 mins ago",
            batteryLevel: 89
          },
          {
            id: "SOIL-001", 
            name: "Soil Monitor 001",
            type: "Soil Probe",
            status: "online",
            lastSync: "5 mins ago",
            batteryLevel: 76
          }
        ]
      },
      {
        id: "FARM-002",
        name: "South Block",
        size: 120,
        soilType: "Sandy Loam",
        cropTypes: ["Coffee", "Bananas"],
        coordinates: { lat: -1.3021, lng: 36.8319 },
        status: "active",
        devices: [
          {
            id: "NPK-002",
            name: "NPK Sensor 002", 
            type: "NPK Monitor",
            status: "warning",
            lastSync: "1 hour ago",
            batteryLevel: 23
          }
        ]
      },
      {
        id: "FARM-003",
        name: "East Valley",
        size: 55,
        soilType: "Red Clay",
        cropTypes: ["Vegetables"],
        coordinates: { lat: -1.2821, lng: 36.8419 },
        status: "maintenance",
        devices: [
          {
            id: "NPK-003",
            name: "NPK Sensor 003",
            type: "NPK Monitor", 
            status: "offline",
            lastSync: "2 days ago"
          }
        ]
      }
    ]
  },
  {
    id: "EST-002",
    name: "Sunrise Estate",
    owner: "Mary Wanjiku",
    location: "Nakuru County, Kenya",
    totalArea: 180,
    establishedDate: "2020-07-22",
    status: "active",
    contactEmail: "mary@sunrise.co.ke",
    phoneNumber: "+254-722-456789",
    farms: [
      {
        id: "FARM-004",
        name: "Main Field",
        size: 180,
        soilType: "Volcanic Soil",
        cropTypes: ["Wheat", "Barley"],
        coordinates: { lat: -0.3021, lng: 36.0719 },
        status: "active",
        devices: [
          {
            id: "NPK-045",
            name: "NPK Sensor 045",
            type: "NPK Monitor",
            status: "offline",
            lastSync: "5 hours ago"
          },
          {
            id: "WEATHER-001",
            name: "Weather Station 001",
            type: "Weather Monitor",
            status: "online", 
            lastSync: "1 min ago",
            batteryLevel: 94
          }
        ]
      }
    ]
  },
  {
    id: "EST-003",
    name: "Hill View Farm",
    owner: "Peter Mwangi",
    location: "Meru County, Kenya",
    totalArea: 95,
    establishedDate: "2018-11-08",
    status: "inactive",
    contactEmail: "peter@hillview.co.ke",
    phoneNumber: "+254-733-789012",
    farms: [
      {
        id: "FARM-005",
        name: "Hillside Plot",
        size: 45,
        soilType: "Sandy Clay",
        cropTypes: ["Tea"],
        coordinates: { lat: 0.0480, lng: 37.6503 },
        status: "inactive",
        devices: [
          {
            id: "NPK-023",
            name: "NPK Sensor 023",
            type: "NPK Monitor",
            status: "warning",
            lastSync: "1 day ago",
            batteryLevel: 45
          }
        ]
      },
      {
        id: "FARM-006",
        name: "Lower Field",
        size: 50,
        soilType: "Black Cotton",
        cropTypes: ["Sorghum"],
        coordinates: { lat: 0.0380, lng: 37.6403 },
        status: "inactive",
        devices: []
      }
    ]
  }
]

export default function Estates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")

  // Calculate overview stats
  const totalEstates = mockEstates.length
  const activeEstates = mockEstates.filter(estate => estate.status === 'active').length
  const totalFarms = mockEstates.reduce((sum, estate) => sum + estate.farms.length, 0)
  const totalDevices = mockEstates.reduce((sum, estate) => 
    sum + estate.farms.reduce((farmSum, farm) => farmSum + farm.devices.length, 0), 0)
  const onlineDevices = mockEstates.reduce((sum, estate) => 
    sum + estate.farms.reduce((farmSum, farm) => 
      farmSum + farm.devices.filter(device => device.status === 'online').length, 0), 0)
  const totalUsers = mockEstates.length // Simplified - each estate has one owner

  // Filter estates based on search and status
  const filteredEstates = mockEstates.filter(estate => {
    const matchesSearch = estate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estate.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estate.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || estate.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleEditEstate = (estate: Estate) => {
    console.log("Edit estate:", estate.id)
    // TODO: Open estate edit dialog
  }

  const handleAddFarm = (estateId: string) => {
    console.log("Add farm to estate:", estateId)
    // TODO: Open add farm dialog
  }

  const handleEditFarm = (farm: any) => {
    console.log("Edit farm:", farm.id)
    // TODO: Open farm edit dialog
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Estates & Farms</h2>
          <p className="text-muted-foreground">
            Manage agricultural estates, farms, and their IoT device infrastructure
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button className="bg-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Estate
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <EstatesOverview 
        totalEstates={totalEstates}
        activeEstates={activeEstates}
        totalFarms={totalFarms}
        totalDevices={totalDevices}
        onlineDevices={onlineDevices}
        totalUsers={totalUsers}
      />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search estates, owners, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All ({totalEstates})
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
          >
            Active ({activeEstates})
          </Button>
          <Button
            variant={filterStatus === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive ({totalEstates - activeEstates})
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Estates List */}
      <div className="space-y-4">
        {filteredEstates.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No estates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first estate"
              }
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Estate
            </Button>
          </div>
        ) : (
          filteredEstates.map((estate) => (
            <EstateCard
              key={estate.id}
              estate={estate}
              onEditEstate={handleEditEstate}
              onAddFarm={handleAddFarm}
              onEditFarm={handleEditFarm}
            />
          ))
        )}
      </div>
    </div>
  )
}