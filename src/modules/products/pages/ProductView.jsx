
import React from "react";
import { X, Package } from "lucide-react";
import { formatCurrency, getProductStatus } from "../utils/productHelpers";

const ProductView = ({ product, onClose }) => {
  if (!product) return null;

  const details = [
    ["SKU Code", product.sku],
    ["Product Name", product.name],
    ["Brand", product.brand],
    ["Category", product.category],
    ["Viscosity", product.viscosity || "-"],
    ["Packaging", product.unit],
    ["Purchase Price", formatCurrency(product.purchasePrice)],
    ["Retail Price", formatCurrency(product.retailPrice)],
    ["Wholesale Price", formatCurrency(product.wholesalePrice)],
    ["Current Stock", product.stock],
    ["Minimum Stock", product.minStock],
    ["GST", `${product.gst}%`],
    ["Status", getProductStatus(product)],
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-[#E53935]">
              <Package size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Product Details</h2>
              <p className="text-xs text-gray-500">{product.sku}</p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={19} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label} className="border-b border-gray-100 pb-3">
              <p className="text-xs font-medium text-gray-400">{label}</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-gray-100 p-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#E53935] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductView;
