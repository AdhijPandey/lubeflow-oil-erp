
import React from "react";
import { Search, Filter } from "lucide-react";

const SupplierFilters = ({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search supplier, phone, GSTIN..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg outline-none bg-white"
          >
            <option value="ALL">All Supplier Types</option>
            <option value="DISTRIBUTOR">Distributor</option>
            <option value="MANUFACTURER">Manufacturer</option>
            <option value="WHOLESALER">Wholesaler</option>
            <option value="RETAILER">Retailer</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none bg-white"
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default SupplierFilters;
