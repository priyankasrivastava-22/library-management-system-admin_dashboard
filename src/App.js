import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/TopBar";

import Dashboard from "./pages/Dashboard";
import Fiction from "./pages/Fiction";
import NonFiction from "./pages/NonFiction";

import Study from "./pages/Study";
import Records from "./pages/Records";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "fiction": return <Fiction />;
      case "nonfiction": return <NonFiction />;
      case "study": return <Study />;
      case "records": return <Records />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        <Topbar theme={theme} toggleTheme={toggleTheme} />
        <div className="page-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;