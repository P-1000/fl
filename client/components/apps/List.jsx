import React from "react";
import { Check, X, Plug } from "lucide-react"; // Import icons for status and connect button
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Slack,
  FileSpreadsheet,
  FileText,
  Coffee,
} from "lucide-react";

// Create an array of apps with descriptions
const apps = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    connected: true,
    description: "Send and receive messages with ease and automate tasks.",
  },
  {
    name: "Slack",
    icon: Slack,
    connected: true,
    description: "Connect and listen to Slack events , send messages and more.",
  },
  {
    name: "Google Sheets",
    icon: FileSpreadsheet,
    connected: false,
    description:
      "Manage your spreadsheets and automate tasks , send messages and more.",
  },
  {
    name: "Google Drive",
    icon: FileText,
    connected: true,
    description:
      "Store and access your files from anywhere and automate tasks.",
  },
  {
    name: "Jira",
    icon: Coffee,
    connected: false,
    description:
      "Track your issues and projects efficiently and automate tasks.",
  },
];

export default function List() {
  const handleConnect = (appName) => {
    alert(`Connecting to ${appName}...`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white text-black shadow-lg">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold">App Connections</CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-1">
          Connect all your apps from one place and manage them easily.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {apps.map((app) => (
            <li
              key={app.name}
              className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <app.icon className="w-8 h-8 text-gray-800" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-medium text-gray-800">
                    {app.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {app.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge
                  variant={app.connected ? "default" : "secondary"}
                  className="ml-auto"
                >
                  {app.connected ? (
                    <>
                      <Check className="w-5 h-5 mr-1" />
                      Connected
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5 mr-1" />
                      Disconnected
                    </>
                  )}
                </Badge>
                {!app.connected && (
                  <Button
                    variant="primary"
                    onClick={() => handleConnect(app.name)}
                    className="flex items-center space-x-2"
                  >
                    <Plug className="w-5 h-5" /> {/* Increased icon size */}
                    <span className="text-sm">Connect</span>{" "}
                    {/* Adjusted font size */}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
