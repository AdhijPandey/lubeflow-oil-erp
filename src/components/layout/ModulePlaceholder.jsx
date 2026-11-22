
import React from "react";
import { Package, Construction } from "lucide-react";

const ModulePlaceholder = ({ moduleName = "Module" }) => {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#E53935]">
        <Package size={30} />
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        {moduleName}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        Welcome to {moduleName} Management.
        This module is ready for development.
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 text-sm text-orange-600">
        <Construction size={16} />
        Module under development
      </div>

    </div>
  );
};

export default ModulePlaceholder;
