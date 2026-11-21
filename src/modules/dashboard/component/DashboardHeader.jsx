
import React from "react";
import {
  Menu,
  Bell,
  CalendarDays,
  LogOut,
  Gauge,
  X,
} from "lucide-react";

const DashboardHeader = ({
  user,
  onMenuOpen,
  onLogout,
  mobileOpen,
  onMobileClose,
}) => {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 bg-[#171A1F] px-4 sm:px-6 lg:px-8">

      {/* LEFT SECTION */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">

        {/* MENU BUTTON */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Toggle sidebar"
        >
          <Menu size={23} />
        </button>

        {/* LUBEFLOW BRAND */}
        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E53935] text-white shadow-lg shadow-red-900/20">
            <Gauge size={24} />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-black tracking-wide text-white sm:text-xl">
              LUBE<span className="text-[#F5A623]">FLOW</span>
            </h1>

            <p className="text-[9px] tracking-[2px] text-gray-500">
              AUTOMOTIVE ERP
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        {/* DATE */}
        <div className="hidden items-center gap-2 text-xs text-gray-400 md:flex">
          <CalendarDays size={17} />
          {today}
        </div>

        {/* NOTIFICATION */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-[#171A1F] bg-[#E53935]" />
        </button>

        <div className="hidden h-8 w-px bg-white/10 sm:block" />

        {/* USER PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E53935]/30 bg-[#E53935]/20 text-sm font-bold text-[#F5A623]">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">
              {user?.name || "Admin"}
            </p>

            <p className="text-[11px] text-gray-500">
              Administrator
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={onLogout}
          className="flex h-10 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-sm font-semibold text-red-400 transition hover:bg-[#E53935] hover:text-white sm:px-4"
          title="Logout"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>

      </div>
    </header>
  );
};

export default DashboardHeader;
