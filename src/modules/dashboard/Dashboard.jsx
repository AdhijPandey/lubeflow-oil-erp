
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./component/Sidebar";
import DashboardHeader from "./component/DashboardHeader";
import DashboardTabs from "./component/DashboardTabs";
import DashboardOverview from "./component/DashboardOverview";

import { dashboardStats, quickActions } from "./data/dashboardData";

const Dashboard = () => {
  const navigate = useNavigate();

  // SIDEBAR STATES
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // TAB STATES
  const [openTabs, setOpenTabs] = useState([
    { name: "Dashboard" },
  ]);

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
      setMobileSidebarOpen((previous) => !previous);
    } else {
      setSidebarExpanded((previous) => !previous);
    }
  };

  // OPEN MENU AND CREATE TAB
  const handleMenuClick = (menuName) => {
    setOpenTabs((previousTabs) => {
      const alreadyOpen = previousTabs.some(
        (tab) => tab.name === menuName
      );

      if (alreadyOpen) {
        return previousTabs;
      }

      return [...previousTabs, { name: menuName }];
    });

    setActiveMenu(menuName);
    setMobileSidebarOpen(false);
  };

  // SWITCH TAB
  const handleTabChange = (menuName) => {
    setActiveMenu(menuName);
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

    // If active tab is closed, switch to previous tab
    if (activeMenu === menuName) {
      const nextIndex = Math.max(0, closingIndex - 1);

      setActiveMenu(
        updatedTabs[nextIndex]?.name || "Dashboard"
      );
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

  // QUICK ACTION ROUTE MAPPING
  const actionRoutes = {
    // PRODUCTS
    "Add Product": "Products",
    "Create New": "Products",
    "New Product": "Products",
    "View Products": "Products",

    // SALES
    "New Sale": "Sales",
    "Create Sale": "Sales",
    "View Sales": "Sales",
    "Sales Entry": "Sales",

    // PURCHASE
    "New Purchase": "Purchase",
    "Purchase Entry": "Purchase",
    "Create Purchase": "Purchase",
    "View Purchases": "Purchase",

    // INVENTORY
    "Add Stock": "Inventory",
    "View Inventory": "Inventory",
    "Stock Adjustment": "Inventory",
    "Stock Transfer": "Inventory",
    "Stock Report": "Inventory",

    // CUSTOMERS
    "Add Customer": "Customers",
    "New Customer": "Customers",
    "Customers": "Customers",

    // SUPPLIERS
    "Add Supplier": "Suppliers",
    "New Supplier": "Suppliers",
    "Suppliers": "Suppliers",

    // REPORTS
    "View Reports": "Reports",
    "Sales Report": "Reports",
    "Purchase Report": "Reports",
    "Stock Report": "Reports",
  };

  // HANDLE QUICK ACTION CLICK
  const handleQuickAction = (actionName) => {
    const targetMenu = actionRoutes[actionName];

    if (targetMenu) {
      handleMenuClick(targetMenu);
    } else {
      console.warn(
        `No dashboard route configured for: ${actionName}`
      );
    }
  };

  // RENDER ACTIVE PAGE
  const renderActivePage = () => {
    if (activeMenu === "Dashboard") {
      return (
        <DashboardOverview
          user={user}
          stats={dashboardStats}
          quickActions={quickActions}
          onQuickAction={handleQuickAction}
        />
      );
    }

    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#E53935]">
          <span className="text-2xl font-bold">
            {activeMenu.charAt(0)}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {activeMenu}
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
          The {activeMenu} module is ready for development.
          We will build this module with separate reusable components.
        </p>

        <button
          type="button"
          onClick={() => handleMenuClick("Dashboard")}
          className="mt-6 rounded-xl bg-[#E53935] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#C62828]"
        >
          Back to Dashboard
        </button>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7]">

      {/* TOP HEADER */}
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
          setSidebarExpanded((previous) => !previous)
        }
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* MAIN CONTENT AREA */}
      <main
        className={`
          min-h-[calc(100vh-76px)]
          transition-[margin] duration-300 ease-in-out
          ${sidebarExpanded ? "lg:ml-[260px]" : "lg:ml-[76px]"}
        `}
      >

        {/* OPEN PAGE TABS */}
        <DashboardTabs
          tabs={openTabs}
          activeTab={activeMenu}
          onTabChange={handleTabChange}
          onTabClose={handleTabClose}
        />

        {/* PAGE CONTENT */}
        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-6 lg:p-8">
          {renderActivePage()}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
