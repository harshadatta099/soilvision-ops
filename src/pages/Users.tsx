import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Download,
  User,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Plus,
  Users as UsersIcon,
  Crown
} from "lucide-react"

interface UserAccount {
  id: string
  name: string
  email: string
  phone: string
  estate: string
  farmsCount: number
  devicesCount: number
  status: "active" | "inactive" | "suspended"
  plan: "basic" | "premium" | "enterprise"
  joinDate: string
  lastActive: string
  subscription: {
    status: "active" | "expired" | "trial"
    expiryDate: string
  }
}

const mockUsers: UserAccount[] = [
  {
    id: "USR-001",
    name: "John Kamau",
    email: "john.kamau@email.com",
    phone: "+254 712 345 678",
    estate: "Green Valley Estate",
    farmsCount: 3,
    devicesCount: 8,
    status: "active",
    plan: "premium",
    joinDate: "2023-08-15",
    lastActive: "2 hours ago",
    subscription: {
      status: "active",
      expiryDate: "2024-08-15"
    }
  },
  {
    id: "USR-002", 
    name: "Mary Wanjiku",
    email: "mary.wanjiku@email.com",
    phone: "+254 721 456 789",
    estate: "Sunrise Estate",
    farmsCount: 2,
    devicesCount: 5,
    status: "active",
    plan: "basic",
    joinDate: "2023-09-22",
    lastActive: "1 day ago",
    subscription: {
      status: "active",
      expiryDate: "2024-09-22"
    }
  },
  {
    id: "USR-003",
    name: "Peter Mwangi", 
    email: "peter.mwangi@email.com",
    phone: "+254 733 567 890",
    estate: "Highland Estate",
    farmsCount: 5,
    devicesCount: 12,
    status: "active",
    plan: "enterprise",
    joinDate: "2023-07-10",
    lastActive: "5 mins ago",
    subscription: {
      status: "active",
      expiryDate: "2024-07-10"
    }
  },
  {
    id: "USR-004",
    name: "Grace Wanjiku",
    email: "grace.wanjiku@email.com", 
    phone: "+254 744 678 901",
    estate: "Valley View Estate",
    farmsCount: 1,
    devicesCount: 3,
    status: "inactive",
    plan: "basic",
    joinDate: "2023-11-05",
    lastActive: "2 weeks ago",
    subscription: {
      status: "expired",
      expiryDate: "2024-01-05"
    }
  }
]

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const getStatusColor = (status: UserAccount['status']) => {
    switch (status) {
      case 'active': return 'bg-success-light text-success border-success/20'
      case 'inactive': return 'bg-muted text-muted-foreground border-border'
      case 'suspended': return 'bg-destructive-light text-destructive border-destructive/20'
      default: return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getPlanColor = (plan: UserAccount['plan']) => {
    switch (plan) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'enterprise': return 'bg-amber-100 text-amber-800'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPlanIcon = (plan: UserAccount['plan']) => {
    switch (plan) {
      case 'enterprise': return <Crown className="h-3 w-3" />
      default: return null
    }
  }

  const getSubscriptionColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success'
      case 'expired': return 'text-destructive'
      case 'trial': return 'text-warning'
      default: return 'text-muted-foreground'
    }
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.estate.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesPlan = planFilter === "all" || user.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">User Management</h2>
          <p className="text-muted-foreground">
            Manage customer accounts and subscriptions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {mockUsers.filter(u => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">85% active rate</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <Crown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockUsers.filter(u => u.plan === "premium" || u.plan === "enterprise").length}
            </div>
            <p className="text-xs text-muted-foreground">High-value customers</p>
          </CardContent>
        </Card>

        <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 285K</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
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
                placeholder="Search users..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Estate</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{user.estate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(user.plan)}>
                      <div className="flex items-center gap-1">
                        {getPlanIcon(user.plan)}
                        {user.plan}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className={`text-sm font-medium ${getSubscriptionColor(user.subscription.status)}`}>
                        {user.subscription.status}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Until {user.subscription.expiryDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.farmsCount} farms</div>
                      <div className="text-muted-foreground">{user.devicesCount} devices</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastActive}
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