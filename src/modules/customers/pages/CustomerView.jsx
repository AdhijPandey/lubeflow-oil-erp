
import React from "react";
import { X, User, MapPin, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/customerHelpers";

const CustomerView = ({ customer, onClose }) => {
  if (!customer) return null;

  const details = [
    ["Customer Code", customer.customerCode],
    ["Customer Type", customer.type],
    ["Contact Person", customer.contactPerson],
    ["Mobile Number", customer.phone],
    ["Email", customer.email],
    ["GSTIN", customer.gstin],
    ["City", customer.city],
    ["State", customer.state],
    ["PIN Code", customer.pincode],
    ["Status", customer.status],
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Customer Details
            </h2>
            <p className="text-sm text-blue-600 mt-1">
              {customer.customerCode}
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
              <User size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold">{customer.name}</h3>
              <p className="text-sm text-slate-500">
                {customer.type === "WHOLESALE" ? "Wholesale Customer" : "Retail Customer"}
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
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={18} className="text-blue-600" />
              <h3 className="font-semibold">Full Address</h3>
            </div>
            <p className="text-sm text-slate-700">
              {[customer.address, customer.city, customer.state, customer.pincode]
                .filter(Boolean)
                .join(", ") || "No address available"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-sm text-blue-700">Credit Limit</p>
              <h3 className="text-xl font-bold text-blue-800 mt-2">
                {formatCurrency(customer.creditLimit)}
              </h3>
            </div>

            <div className="bg-orange-50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-orange-700">
                <Wallet size={18} />
                <p className="text-sm">Outstanding Balance</p>
              </div>
              <h3 className="text-xl font-bold text-orange-800 mt-2">
                {formatCurrency(customer.outstanding)}
              </h3>
            </div>
          </div>

          {customer.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-slate-600">{customer.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
