
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./component/Sidebar";
import DashboardHeader from "./component/DashboardHeader";
import DashboardTabs from "./component/DashboardTabs";
import ModuleRenderer from "../../components/layout/ModuleRenderer";

import { dashboardStats, quickActions } from "./data/dashboardData";

const Dashboard = () => {
  const navigate = useNavigate();

  // SIDEBAR STATES
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // OPEN TABS
  const [openTabs, setOpenTabs] = useState([
    { name: "Dashboard" },
  ]);

  // ACTIVE COMPONENT
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // GET LOGGED-IN USER
  const getUser = () => {
    const storedUser =
      localStorage.getItem("lubeflow_user") ||
      sessionStorage.getItem("lubeflow_user");

    try {
      return storedUser
        ? JSON.parse(storedUser)
        : { name: "Admin", role: "ADMIN" };
    } catch (error) {
      console.error("Unable to read user session:", error);
      return { name: "Admin", role: "ADMIN" };
    }
  };

  const user = getUser();

  // HEADER MENU BUTTON
  const handleMenuOpen = () => {
    if (window.innerWidth < 1024) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarExpanded((prev) => !prev);
    }
  };

  // OPEN COMPONENT FROM SIDEBAR
  const handleMenuClick = (menuName) => {
    setOpenTabs((prev) => {
      const alreadyOpen = prev.some(
        (tab) => tab.name === menuName
      );

      if (alreadyOpen) {
        return prev;
      }

      return [...prev, { name: menuName }];
    });

    setActiveMenu(menuName);
    setMobileSidebarOpen(false);
  };

  // SWITCH BETWEEN OPEN TABS
  const handleTabChange = (menuName) => {
    handleMenuClick(menuName);
  };

  // CLOSE TAB
  const handleTabClose = (menuName) => {
    if (menuName === "Dashboard") return;

    const closingIndex = openTabs.findIndex(
      (tab) => tab.name === menuName
    );

    if (closingIndex === -1) return;

    const updatedTabs = openTabs.filter(
      (tab) => tab.name !== menuName
    );

    setOpenTabs(updatedTabs);

    if (activeMenu === menuName) {
      const nextIndex = Math.max(0, closingIndex - 1);

      setActiveMenu(
        updatedTabs[nextIndex]?.name || "Dashboard"
      );
    }
  };

  // QUICK ACTION MAPPING
  const actionModules = {
    "Add Product": "Products",
    "Create New": "Products",
    "New Product": "Products",
    "View Products": "Products",

    "New Sale": "Sales",
    "Create Sale": "Sales",
    "View Sales": "Sales",
    "Sales Entry": "Sales",

    "New Purchase": "Purchase",
    "Purchase Entry": "Purchase",
    "Create Purchase": "Purchase",
    "View Purchases": "Purchase",

    "Add Stock": "Inventory",
    "View Inventory": "Inventory",
    "Stock Adjustment": "Inventory",
    "Stock Transfer": "Inventory",

    "Add Customer": "Customers",
    "New Customer": "Customers",

    "Add Supplier": "Suppliers",
    "New Supplier": "Suppliers",

    "View Reports": "Reports",
    "Sales Report": "Reports",
    "Purchase Report": "Reports",
    "Stock Report": "Inventory",
  };

  // HANDLE QUICK ACTION
  const handleQuickAction = (actionName) => {
    const target = actionModules[actionName];

    if (target) {
      handleMenuClick(target);
    } else {
      console.warn(`Module not configured: ${actionName}`);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("lubeflow_user");
    localStorage.removeItem("lubeflow_auth");

    sessionStorage.removeItem("lubeflow_user");
    sessionStorage.removeItem("lubeflow_auth");

    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">

      {/* HEADER */}
      <DashboardHeader
        user={user}
        activeMenu={activeMenu}
        onMenuOpen={handleMenuOpen}
        onLogout={handleLogout}
      />

      {/* SIDEBAR */}
      <Sidebar
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
        isExpanded={sidebarExpanded}
        onToggle={() =>
          setSidebarExpanded((prev) => !prev)
        }
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main
        className={`
          min-h-[calc(100vh-76px)]
          transition-[margin] duration-300 ease-in-out
          ${sidebarExpanded ? "lg:ml-[260px]" : "lg:ml-[76px]"}
        `}
      >

        {/* DASHBOARD TABS */}
        <DashboardTabs
          tabs={openTabs}
          activeTab={activeMenu}
          onTabChange={handleTabChange}
          onTabClose={handleTabClose}
          availableTabs={openTabs}
        />

        {/* COMPONENT RENDERER */}
        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-6 lg:p-8">

          {openTabs.map((tab) => (
            <div
              key={tab.name}
              className={
                activeMenu === tab.name ? "block" : "hidden"
              }
            >
              <ModuleRenderer
                activeMenu={tab.name}
                user={user}
                stats={dashboardStats}
                quickActions={quickActions}
                onQuickAction={handleQuickAction}
              />
            </div>
          ))}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
