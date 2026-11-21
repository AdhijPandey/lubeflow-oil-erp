
import React from "react";
import {
  Gauge,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Boxes,
  Users,
  UserRound,
  FileBarChart,
  Settings,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

const menuGroups = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Products", icon: Package },
      { name: "Sales", icon: ShoppingCart },
      { name: "Purchase", icon: Truck },
      { name: "Inventory", icon: Boxes },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Customers", icon: Users },
      { name: "Suppliers", icon: UserRound },
      { name: "Reports", icon: FileBarChart },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { name: "Settings", icon: Settings },
    ],
  },
];

const Sidebar = ({
  activeMenu,
  onMenuClick,
  isExpanded,
  onToggle,
  mobileOpen,
  onClose,
}) => {
  const handleItemClick = (name) => {
    onMenuClick(name);
    onClose();
  };

  return (
    <>
      {/* MOBILE BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-0 top-[76px] z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-[76px] z-40
          flex h-[calc(100vh-76px)] flex-col
          border-r border-white/10 bg-[#171A1F]
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-[260px]" : "w-[76px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
      

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-5">
          {menuGroups.map((group) => (
            <div key={group.title}>
              {isExpanded && (
                <p className="mb-3 px-3 text-[10px] font-bold tracking-[2px] text-gray-500">
                  {group.title}
                </p>
              )}

              {!isExpanded && (
                <div className="mb-3 border-t border-white/10" />
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.name;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      title={!isExpanded ? item.name : ""}
                      onClick={() => handleItemClick(item.name)}
                      className={`
                        flex w-full items-center rounded-xl py-3
                        text-sm font-medium transition-all duration-200
                        ${isExpanded ? "justify-between px-3" : "justify-center px-0"}
                        ${
                          isActive
                            ? "bg-[#E53935] text-white shadow-lg shadow-red-900/20"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      <span className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
                        <Icon size={20} className="shrink-0" />
                        {isExpanded && <span>{item.name}</span>}
                      </span>

                      {isExpanded && isActive && (
                        <ChevronRight size={17} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-3 top-6 hidden h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#252A32] text-gray-300 shadow-lg transition hover:bg-[#E53935] hover:text-white lg:flex"
          aria-label="Expand or collapse sidebar"
          title="Expand or collapse sidebar"
        >
          {isExpanded ? (
            <PanelLeftClose size={15} />
          ) : (
            <PanelLeftOpen size={15} />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
