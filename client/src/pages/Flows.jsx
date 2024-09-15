import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Plus, Search, Settings, Zap } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link, useNavigate } from "react-router-dom"
const flos = [
  {
    id: 1,
    name: "New Trello Card to Slack",
    description: "Notify Slack when a new Trello card is created",
    apps: ["trello", "slack"],
    status: "Active",
    lastRun: "2 hours ago",
  },
  {
    id: 2,
    name: "Gmail to Google Sheets",
    description: "Log emails to Google Sheets",
    apps: ["gmail", "google-sheets"],
    status: "Active",
    lastRun: "1 day ago",
  },
  {
    id: 3,
    name: "Twitter to Buffer",
    description: "Schedule tweets using Buffer",
    apps: ["twitter", "buffer"],
    status: "Inactive",
    lastRun: "3 days ago",
  },
  {
    id: 4,
    name: "Shopify Order to QuickBooks",
    description: "Create QuickBooks invoice for new Shopify orders",
    apps: ["shopify", "quickbooks"],
    status: "Active",
    lastRun: "5 hours ago",
  },
  {
    id: 5,
    name: "GitHub Issues to Asana",
    description: "Create Asana tasks from new GitHub issues",
    apps: ["github", "asana"],
    status: "Active",
    lastRun: "1 hour ago",
  },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredFlos = flos.filter(
    (flo) =>
      flo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || flo.status.toLowerCase() === statusFilter)
  ) 

const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              <a className="text-sm font-medium hover:underline" href="#">
                Dashboard
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                My Flos
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                Explore
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost">
              <Bell className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage alt="User" src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Flos</h1>
          <Button 
          className="bg-black text-white rounded">
          <Link to="/flows/create-flows" className=" flex w-fit items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
           <h1> Create Flo</h1>
          </Link>
          </Button>
        </div>
        <div className="flex space-x-4 mb-6">
          <Input
            className="max-w-sm"
            placeholder="Search Flos..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Connected Apps</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlos.map((flo) => (
              <TableRow key={flo.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{flo.name}</div>
                    <div className="text-sm text-muted-foreground">{flo.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {flo.apps.map((app) => (
                      <img
                        key={app}
                        alt={app}
                        className="w-6 h-6"
                        src={`/${app}.png`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      flo.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {flo.status}
                  </span>
                </TableCell>
                <TableCell>{flo.lastRun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}