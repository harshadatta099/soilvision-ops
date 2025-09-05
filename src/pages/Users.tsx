import { useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/status-badge"

const mockUsers = [
  {
    id: 1,
    name: "John Davis",
    email: "john.davis@email.com",
    phone: "+1 234 567 8901",
    estates: 2,
    farms: 5,
    devices: 12,
    subscription: "Premium",
    status: "online" as const,
    joinDate: "2024-01-15",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@farmcorp.com",
    phone: "+1 234 567 8902",
    estates: 1,
    farms: 3,
    devices: 8,
    subscription: "Basic",
    status: "idle" as const,
    joinDate: "2024-02-20",
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "m.wilson@greenfarms.com",
    phone: "+1 234 567 8903",
    estates: 3,
    farms: 8,
    devices: 24,
    subscription: "Enterprise",
    status: "online" as const,
    joinDate: "2023-11-10",
    lastActive: "5 minutes ago"
  },
  {
    id: 4,
    name: "Emma Thompson",
    email: "emma.t@organic-valley.com",
    phone: "+1 234 567 8904",
    estates: 1,
    farms: 2,
    devices: 6,
    subscription: "Basic",
    status: "offline" as const,
    joinDate: "2024-03-05",
    lastActive: "3 days ago"
  }
]

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Users</h2>
          <p className="text-muted-foreground">
            Manage your FarmFuture customers and their subscriptions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-gradient-primary">
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-card-border bg-gradient-surface shadow-custom-sm">
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.phone}</div>
                      <div className="text-muted-foreground">Joined {user.joinDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{user.estates} Estates</div>
                      <div>{user.farms} Farms • {user.devices} Devices</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      user.subscription === 'Enterprise' 
                        ? 'bg-primary-light text-primary' 
                        : user.subscription === 'Premium'
                        ? 'bg-warning-light text-warning-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {user.subscription}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastActive}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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