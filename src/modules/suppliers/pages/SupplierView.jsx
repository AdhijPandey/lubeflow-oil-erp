
import React from "react";
import { X, Truck, MapPin, Wallet } from "lucide-react";

import {
  formatCurrency,
  getSupplierTypeLabel,
} from "../utils/supplierHelpers";

const SupplierView = ({ supplier, onClose }) => {
  if (!supplier) return null;

  const details = [
    ["Supplier Code", supplier.supplierCode],
    ["Supplier Type", getSupplierTypeLabel(supplier.supplierType)],
    ["Contact Person", supplier.contactPerson],
    ["Mobile", supplier.phone],
    ["Alternate Mobile", supplier.alternatePhone],
    ["Email", supplier.email],
    ["GSTIN", supplier.gstin],
    ["City", supplier.city],
    ["State", supplier.state],
    ["PIN Code", supplier.pincode],
    ["Payment Terms", supplier.paymentTerms],
    ["Status", supplier.status],
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Supplier Details
            </h2>
            <p className="text-sm text-blue-600 mt-1">
              {supplier.supplierCode}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-blue-600 rounded-xl p-4">
              <Truck size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold">{supplier.companyName}</h3>
              <p className="text-sm text-slate-500">
                {getSupplierTypeLabel(supplier.supplierType)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {details.map(([label, value]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-semibold text-slate-800 mt-1">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-blue-600" />
              <h3 className="font-semibold">Business Address</h3>
            </div>

            <p className="text-sm text-slate-700">
              {[
                supplier.address,
                supplier.city,
                supplier.state,
                supplier.pincode,
              ]
                .filter(Boolean)
                .join(", ") || "No address available"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-sm text-blue-700">Credit Limit</p>
              <h3 className="text-xl font-bold text-blue-800 mt-2">
                {formatCurrency(supplier.creditLimit)}
              </h3>
            </div>

            <div className="bg-orange-50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-orange-700">
                <Wallet size={18} />
                <p className="text-sm">Outstanding Payable</p>
              </div>

              <h3 className="text-xl font-bold text-orange-800 mt-2">
                {formatCurrency(supplier.outstanding)}
              </h3>
            </div>
          </div>

          {supplier.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-slate-600">{supplier.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierView;
