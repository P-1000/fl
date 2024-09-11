import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import CreateWorkflow from "../pages/CreateWorkflow";
import AppList from "../pages/AppList";
import NotFound from "../pages/NotFound";
function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-100 min-h-screen">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/create-workflow" element={<CreateWorkflow />} />
            <Route path="/apps" element={<AppList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
