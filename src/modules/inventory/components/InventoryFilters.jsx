
import React from "react";
import { Search, Filter } from "lucide-react";

const InventoryFilters = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, SKU, brand..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative md:w-56">
          <Filter
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg outline-none bg-white"
          >
            <option value="ALL">All Stock</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
