
import React from "react";
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
}) => {
  return (
    <div className="w-full border-b border-gray-200 bg-white">

      <div className="flex h-[52px] items-stretch gap-1 overflow-x-auto px-3 sm:px-5 dashboard-tabs-scroll">

        {tabs.map((tab) => {
          const Icon = tabIcons[tab.name] || LayoutDashboard;
          const isActive = activeTab === tab.name;
          const isDashboard = tab.name === "Dashboard";

          return (
            <div
              key={tab.name}
              className={`
                group relative flex h-full min-w-[125px] max-w-[190px]
                shrink-0 items-center border-r border-gray-100
                transition-colors
                ${
                  isActive
                    ? "bg-[#FFF5F4]"
                    : "bg-white hover:bg-gray-50"
                }
              `}
            >

              {/* ACTIVE INDICATOR */}
              {isActive && (
                <span className="absolute left-0 right-0 top-0 h-[3px] bg-[#E53935]" />
              )}

              {/* TAB BUTTON */}
              <button
                type="button"
                onClick={() => onTabChange?.(tab.name)}
                title={tab.name}
                className="flex h-full min-w-0 flex-1 items-center gap-2 px-3 pt-[2px] text-left"
              >
                <Icon
                  size={16}
                  className={
                    isActive
                      ? "shrink-0 text-[#E53935]"
                      : "shrink-0 text-gray-400 group-hover:text-gray-600"
                  }
                />

                <span
                  className={`
                    truncate text-xs font-semibold
                    ${
                      isActive
                        ? "text-[#20252D]"
                        : "text-gray-500 group-hover:text-gray-800"
                    }
                  `}
                >
                  {tab.name}
                </span>
              </button>

              {/* CLOSE TAB */}
              {!isDashboard && (
                <button
                  type="button"
                  onClick={() => onTabClose?.(tab.name)}
                  aria-label={`Close ${tab.name} tab`}
                  title={`Close ${tab.name}`}
                  className="
                    mr-2 flex h-6 w-6 shrink-0 items-center
                    justify-center rounded-md text-gray-400
                    opacity-70 transition
                    hover:bg-red-100 hover:text-[#E53935]
                    sm:opacity-0 sm:group-hover:opacity-100
                  "
                >
                  <X size={14} />
                </button>
              )}

            </div>
          );
        })}

      </div>

      <style>{`
        .dashboard-tabs-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        .dashboard-tabs-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .dashboard-tabs-scroll::-webkit-scrollbar-track {
          background: transparent;
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
