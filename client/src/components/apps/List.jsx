import React, { useState } from "react";
import { Check, Plug } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 
import { FaWhatsapp } from "react-icons/fa";
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
import SendMessageToSlack from "../MsgSlack";
import { AiOutlineSlackSquare } from "react-icons/ai";
import { SiGooglesheets } from "react-icons/si";
import { FaGoogleDrive } from "react-icons/fa6";
import { SiJira } from "react-icons/si";

const initialApps = [
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    connected: false,
    description: "Send and receive messages with ease and automate tasks.",
  },
  {
    name: "Slack",
    icon: AiOutlineSlackSquare,
    connected: false,
    description: "Connect and listen to Slack events, send messages, and more.",
  },
  {
    name: "Google Sheets",
    icon: SiGooglesheets,
    connected: false,
    description:
      "Manage your spreadsheets and automate tasks, send messages, and more.",
  },
  {
    name: "Google Drive",
    icon: FaGoogleDrive,
    connected: false,
    description:
      "Store and access your files from anywhere and automate tasks.",
  },
  {
    name: "Jira",
    icon: SiJira,
    connected: false,
    description: "Track your issues and projects efficiently and automate tasks.",
  },
];

export default function List() {
  const [apps, setApps] = useState(initialApps);

  const handleConnect = (appName) => {
    alert(`Connecting to ${appName}...`);
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.name === appName ? { ...app, connected: true } : app
      )
    );
  };

  const handleSlackConnect = () => {
    window.location.href = "https://localhost:3000/slack/auth";
  };

  return (
    <>
      <Card className="py-10 px-10 h-screen  mx-auto bg-white text-black rounded-lg">
        <CardHeader className="">
          <CardTitle className="text-4xl font-semibold text-gray-900">App Connections</CardTitle>
          <CardDescription className="text-lg text-gray-500 mt-1">
            Manage all your app connections from one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {apps.map((app) => (
              <li
                key={app.name}
                className="flex items-center justify-between p-4 border
                  bg-gray-100/10 rounded-xl
                 hover:bg-gray-200 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <app.icon className="w-8 h-8 text-gray-600" />
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800">
                      {app.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {app.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {app.connected ? (
                    <Button
                      variant="outline"
                      disabled
                      className="flex rounded-xl items-center space-x-2 border border-gray-400 bg-white  hover:bg-gray-50/10  px-10 py-2 "
                    >
                      <Check className="w-6 h-6" />
                      <span className="text-sm text-black font-medium">Connected</span>
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() =>
                        app.name === "Slack" ? handleSlackConnect() : handleConnect(app.name)
                      }
                      className="flex items-center space-x-2 bg-black text-white hover:bg-gray-900 px-4 py-2 rounded-xl"
                    >
                      <Plug className="w-5 h-5" />
                      <span className="text-sm font-medium pr-1">Connect</span>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* <SendMessageToSlack /> */}
    </>
  );
}
