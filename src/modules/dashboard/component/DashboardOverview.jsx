import React from "react";
import {
  Plus,
  CalendarDays,
  TrendingUp,
  Clock3,
} from "lucide-react";

import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import InventoryOverview from "./InventoryOverview";
import RecentTransactions from "./RecentTransactions";

const DashboardOverview = ({
  user,
  stats,
  quickActions,
  onQuickAction,
}) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Overview</span>
            <span>/</span>
            <span className="font-semibold text-gray-700">Dashboard</span>
          </div>

          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#20252D] sm:text-3xl">
            Welcome, {user?.name || "Admin"}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Here's your automotive lubricant business overview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs font-medium text-gray-600 shadow-sm">
            <CalendarDays size={16} className="text-[#E53935]" />
            {today}
          </div>

          <button
            type="button"
            onClick={() => onQuickAction?.("Create New")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E53935] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C62828]"
          >
            <Plus size={18} />
            Create New
          </button>
        </div>
      </section>

      {/* BUSINESS STATISTICS */}
      <DashboardStats stats={stats} />

      {/* QUICK ACTIONS */}
      <QuickActions
        actions={quickActions}
        onAction={onQuickAction}
      />

      {/* INVENTORY + LOW STOCK */}
      <InventoryOverview
        onViewInventory={() => onQuickAction?.("View Inventory")}
      />

      {/* RECENT TRANSACTIONS */}
      <RecentTransactions
        onViewReports={() => onQuickAction?.("View Reports")}
      />

      {/* BUSINESS INSIGHT BANNER */}
      <section className="relative mt-7 overflow-hidden rounded-2xl bg-gradient-to-r from-[#171A1F] via-[#22262E] to-[#351C20] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-[#E53935]/20 blur-[90px]" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5A623]">
              <TrendingUp size={16} />
              LUBEFLOW BUSINESS INSIGHTS
            </div>

            <h2 className="mt-3 text-xl font-extrabold sm:text-2xl">
              Manage your shop. Grow your business.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
              Keep track of stock, sales, purchases, customer dues and
              supplier payments from one centralized platform.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#F5A623]/20 bg-[#F5A623]/10">
            <Clock3 size={32} className="text-[#F5A623]" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-gray-200 py-5 text-xs text-gray-400 sm:flex-row">
        <p>© {new Date().getFullYear()} LubeFlow ERP. All rights reserved.</p>
        <p>Automotive Lubricants Shop Management</p>
      </footer>
    </div>
  );
};

export default DashboardOverview;