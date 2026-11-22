
import React from "react";
import { X, Receipt } from "lucide-react";
import { formatCurrency } from "../utils/salesHelpers";

const SalesView = ({ sale, onClose }) => {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-[#E53935]">
              <Receipt size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">
                Sales Details
              </h2>
              <p className="text-xs text-gray-500">
                {sale.invoiceNo}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 p-6 sm:grid-cols-3">
          {[
            ["Invoice", sale.invoiceNo],
            ["Date", sale.date],
            ["Customer", sale.customer],
            ["Mobile", sale.phone],
            ["Sale Type", sale.saleType],
            ["Payment Mode", sale.paymentMode],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {value || "-"}
              </p>
            </div>
          ))}
        </div>

        <div className="px-6 pb-5">
          <h3 className="mb-3 font-bold text-gray-800">
            Products
          </h3>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">GST</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sale.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-3">{item.productName}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{formatCurrency(item.price)}</td>
                    <td className="p-3">{item.gst}%</td>
                    <td className="p-3 font-semibold">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 bg-gray-50 p-6">
          {[
            ["Subtotal", sale.subtotal],
            ["Discount", sale.discount],
            ["GST", sale.gstAmount],
            ["Grand Total", sale.total],
            ["Received", sale.paid],
            ["Balance Due", sale.due],
          ].map(([label, amount]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-gray-500">{label}</span>
              <span className="font-semibold text-gray-800">
                {formatCurrency(amount)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end p-4">
          <button onClick={onClose} className="rounded-lg bg-[#E53935] px-5 py-2.5 text-sm font-semibold text-white">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default SalesView;
