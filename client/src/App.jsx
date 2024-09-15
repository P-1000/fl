import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AppList from "./pages/AppList";
import WP from "./components/wa/WP";
import Flows from "./pages/Flows";
import CreateFlow from "./pages/CreateFlow";
function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow min-h-screen">
          <Routes>
            <Route path="/apps" element={<AppList />} />
            <Route path="/flows" element={<Flows />} />
            <Route path="flows/create-flows" element={<CreateFlow />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
