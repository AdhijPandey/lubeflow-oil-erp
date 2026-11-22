
import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  onClear,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row">

        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product, SKU, brand..."
            className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100"
          />
        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 min-w-[160px] rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
          >
            <option value="ALL">All Categories</option>
            <option value="Bike Engine Oil">Bike Engine Oil</option>
            <option value="Car Engine Oil">Car Engine Oil</option>
            <option value="Tractor Engine Oil">Tractor Engine Oil</option>
            <option value="Gear Oil">Gear Oil</option>
            <option value="Industrial Oil">Industrial Oil</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 min-w-[140px] rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#E53935]"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            type="button"
            onClick={onClear}
            className="flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-4 text-sm text-gray-600 hover:bg-gray-50"
          >
            <X size={15} />
            Clear
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
