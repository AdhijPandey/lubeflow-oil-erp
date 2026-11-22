
import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";

import { formatCurrency, getProductStatus } from "../utils/productHelpers";

const ProductTable = ({
  products,
  onView,
  onEdit,
  onDelete,
}) => {
  const statusClasses = {
    ACTIVE: "bg-green-50 text-green-700",
    INACTIVE: "bg-gray-100 text-gray-600",
    "LOW STOCK": "bg-orange-50 text-orange-700",
    "OUT OF STOCK": "bg-red-50 text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">

          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">SKU</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Unit</th>
              <th className="px-5 py-4">Purchase Price</th>
              <th className="px-5 py-4">Retail Price</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">

            {products.length > 0 ? (
              products.map((product) => {
                const status = getProductStatus(product);

                return (
                  <tr
                    key={product.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {product.brand} · {product.viscosity}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.sku}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {product.unit}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {formatCurrency(product.purchasePrice)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                      {formatCurrency(product.retailPrice)}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                      {product.stock}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusClasses[status]}`}>
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-1">

                        <button
                          onClick={() => onView(product)}
                          title="View"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => onEdit(product)}
                          title="Edit"
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => onDelete(product)}
                          title="Delete"
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-5 py-16 text-center text-sm text-gray-400">
                  No products found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
