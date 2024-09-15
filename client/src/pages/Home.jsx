import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Plus, Search, Settings, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              {/* <a className="text-sm font-medium hover:underline" href="#">
                Dashboard
              </a> */}
              <a className="text-sm font-medium hover:underline" href="#">
                Explore
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form className="hidden md:block">
              <Input className="w-96 rounded-xl" placeholder="Search Zaps..." type="search" />
            </form>
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
      <div className="flex-1 flex">
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome back, User!</h1>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Flo
            </Button>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Flos</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-4 sora md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>New Trello Card to Slack</CardTitle>
                    <CardDescription>Notify Slack when a new Trello card is created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Last run: 2 hours ago</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Gmail to Google Sheets</CardTitle>
                    <CardDescription>Log emails to Google Sheets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Last run: 1 day ago</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Twitter to Buffer</CardTitle>
                    <CardDescription>Schedule tweets using Buffer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Last run: 3 days ago</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <aside className="w-64 border-l p-6 hidden lg:block">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <a className="text-sm hover:underline" href="#">
                Create a new Flo
              </a>
            </li>
            <li>
              <a className="text-sm hover:underline" href="#">
                View tutorials
              </a>
            </li>
          </ul>
          <h2 className="font-semibold mt-6 mb-4">Suggested Apps</h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <img alt="Slack" className="w-6 h-6" src="/placeholder.svg?height=24&width=24" />
              <span className="text-sm">Slack</span>
            </li>
            <li className="flex items-center space-x-2">
              <img alt="Google Sheets" className="w-6 h-6" src="/placeholder.svg?height=24&width=24" />
              <span className="text-sm">Google Sheets</span>
            </li>
            <li className="flex items-center space-x-2">
              <img alt="Trello" className="w-6 h-6" src="/placeholder.svg?height=24&width=24" />
              <span className="text-sm">Trello</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  )
}