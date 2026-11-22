
import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Boxes,
  Users,
  UserRound,
  FileBarChart,
  Settings,
  X,
  Plus,
  History,
  Search,
  Clock,
} from "lucide-react";

const tabIcons = {
  Dashboard: LayoutDashboard,
  Products: Package,
  Sales: ShoppingCart,
  Purchase: Truck,
  Inventory: Boxes,
  Customers: Users,
  Suppliers: UserRound,
  Reports: FileBarChart,
  Settings: Settings,
};

const DashboardTabs = ({
  tabs = [],
  activeTab,
  onTabChange,
  onTabClose,
  availableTabs = [],
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  // Handle tab change and maintain recent history
  const handleTabChange = (name) => {
    setHistory((prev) => [
      name,
      ...prev.filter((item) => item !== name),
    ]);

    onTabChange?.(name);

    setShowHistory(false);
    setShowSearch(false);
    setSearch("");
  };

  // Clear all recent tab history
  const handleClearHistory = () => {
    setHistory([]);
  };

  // Search available tabs
  const filteredTabs = availableTabs.filter((tab) =>
    tab.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full border-b border-gray-200 bg-white">
      <div className="flex h-[52px] items-stretch">

        {/* LEFT SIDE TABS */}
        <div className="dashboard-tabs-scroll flex min-w-0 flex-1 items-stretch gap-1 overflow-x-auto px-3 sm:px-5">
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.name] || LayoutDashboard;
            const isActive = activeTab === tab.name;
            const isDashboard = tab.name === "Dashboard";

            return (
              <div
                key={tab.name}
                className={`group relative flex h-full min-w-[125px] max-w-[190px]
                shrink-0 items-center border-r border-gray-100
                transition-colors ${
                  isActive
                    ? "bg-[#FFF5F4]"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 right-0 top-0 h-[3px] bg-[#E53935]" />
                )}

                <button
                  type="button"
                  onClick={() => handleTabChange(tab.name)}
                  title={tab.name}
                  className="flex h-full min-w-0 flex-1 items-center gap-2 px-3 pt-[2px] text-left"
                >
                  <Icon
                    size={16}
                    className={`shrink-0 ${
                      isActive ? "text-[#E53935]" : "text-gray-400"
                    }`}
                  />

                  <span
                    className={`truncate text-xs font-semibold ${
                      isActive ? "text-[#20252D]" : "text-gray-500"
                    }`}
                  >
                    {tab.name}
                  </span>
                </button>

                {!isDashboard && (
                  <button
                    type="button"
                    onClick={() => onTabClose?.(tab.name)}
                    aria-label={`Close ${tab.name} tab`}
                    className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-red-100 hover:text-[#E53935] sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="relative z-20 flex shrink-0 items-center gap-1 border-l border-gray-100 bg-white px-2">

          {/* HISTORY BUTTON */}
          <button
            type="button"
            onClick={() => {
              setShowHistory(!showHistory);
              setShowSearch(false);
            }}
            title="Tab History"
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              showHistory
                ? "bg-[#FFF0EF] text-[#E53935]"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <History size={17} />
          </button>

          {/* ADD / SEARCH TAB */}
          <button
            type="button"
            onClick={() => {
              setShowSearch(!showSearch);
              setShowHistory(false);
            }}
            title="Search and add tab"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E53935] text-white shadow-sm transition hover:bg-[#C62828]"
          >
            <Plus size={19} />
          </button>

          {/* HISTORY DROPDOWN */}
          {showHistory && (
            <div className="absolute right-12 top-[46px] z-50 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

              {/* HISTORY HEADER */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    Recent Tabs
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Recently visited pages
                  </p>
                </div>

                {/* CLEAR ALL BUTTON */}
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* HISTORY LIST */}
              <div className="max-h-64 overflow-y-auto p-2">
                {history.length > 0 ? (
                  history.map((name, index) => {
                    const Icon = tabIcons[name] || LayoutDashboard;

                    return (
                      <button
                        key={`${name}-${index}`}
                        type="button"
                        onClick={() => handleTabChange(name)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-600 hover:bg-[#FFF5F4] hover:text-[#E53935]"
                      >
                        <Clock size={15} />
                        <Icon size={16} />
                        <span className="flex-1">{name}</span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-6 text-center">
                    <History
                      size={25}
                      className="mx-auto mb-2 text-gray-300"
                    />
                    <p className="text-xs text-gray-400">
                      No recent tabs available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SEARCH DROPDOWN */}
          {showSearch && (
            <div className="absolute right-2 top-[46px] z-50 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

              <div className="border-b border-gray-100 p-3">
                <h3 className="mb-3 text-sm font-bold text-gray-800">
                  Open New Tab
                </h3>

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3">
                  <Search size={16} className="text-gray-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tabs..."
                    autoFocus
                    className="h-9 w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto p-2">
                {filteredTabs.length > 0 ? (
                  filteredTabs.map((tab) => {
                    const Icon = tabIcons[tab.name] || LayoutDashboard;

                    const isOpen = tabs.some(
                      (item) => item.name === tab.name
                    );

                    return (
                      <button
                        key={tab.name}
                        type="button"
                        disabled={isOpen}
                        onClick={() => handleTabChange(tab.name)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm ${
                          isOpen
                            ? "cursor-not-allowed text-gray-300"
                            : "text-gray-600 hover:bg-[#FFF5F4] hover:text-[#E53935]"
                        }`}
                      >
                        <Icon size={17} />

                        <span className="flex-1">{tab.name}</span>

                        {isOpen ? (
                          <span className="text-[10px]">OPEN</span>
                        ) : (
                          <Plus size={15} />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="px-3 py-6 text-center text-xs text-gray-400">
                    No tabs found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCROLLBAR STYLING */}
      <style>{`
        .dashboard-tabs-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        .dashboard-tabs-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .dashboard-tabs-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DashboardTabs;
