import { useState, useEffect } from "react"
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
import { Bell, Zap } from "lucide-react"

const apps = [
  { id: 1, name: "Slack", category: "Communication", connected: false, logo: "/slack.png" },
  { id: 3, name: "Gmail", category: "Email", connected: true, logo: "/gmail.png" },
  { id: 8, name: "Google Drive", category: "File Storage", connected: true, logo: "/gdrive.png" },
  { id: 9, name: "Jira", category: "Project Management", connected: false, logo: "/jira.png" },
  { id: 10, name: "WhatsApp", category: "Communication", connected: true, logo: "/whatsapp.png" },
  {id :11 , name :"Zendesk", category:"Customer Support", connected: false, logo:"/zendesk.png"}
]

export default function List() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [appConnections, setAppConnections] = useState(apps);

  const redirectToSlackAuth = () => {
    window.location.href = "http://localhost:3000/auth/slack";
  };

  const toggleSlackConnection = () => {
    const slackApp = appConnections.find((app) => app.name === "Slack");
    if (slackApp.connected) {
      // Handle disconnect (if needed)
      setAppConnections((prevConnections) =>
        prevConnections.map((app) =>
          app.id === slackApp.id ? { ...app, connected: false } : app
        )
      );
    } else {
      redirectToSlackAuth();
    }
  };

  const filteredApps = appConnections.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || app.category === categoryFilter)
  );

  const categories = ["all", ...new Set(apps.map((app) => app.category))];

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
                My Flows
              </a>
              <a className="text-sm font-medium hover:underline" href="#">
                Apps
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="icon" variant="ghost">
              <Bell className="w-5 h-5" />
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
          <h1 className="text-3xl font-bold">App Connections</h1>
        </div>
        <div className="flex bg-white z-50 space-x-4 mb-6">
          <Input
            className="max-w-sm bg-white z-50"
            placeholder="Search apps..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <img src={app.logo} alt={`${app.name} logo`} className="w-12 h-12 rounded" />
                <div>
                  <h2 className="font-semibold">{app.name}</h2>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
              </div>
              {app.name === "Slack" ? (
                <Button
                  variant={app.connected ? "outline" : "default"}
                  onClick={toggleSlackConnection}
                >
                  {app.connected ? "Disconnect" : "Connect"}
                </Button>
              ) : (
                <Button variant={app.connected ? "outline" : "default"}>
                  {app.connected ? "Disconnect" : "Connect"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
