
import React from "react";
import { X } from "lucide-react";
import { formatCurrency } from "../utils/purchaseHelpers";

const PurchaseView = ({ purchase, onClose }) => {
  if (!purchase) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
        <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Purchase Details</h2>
            <p className="text-sm text-blue-600 mt-1">
              {purchase.purchaseNo}
            </p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["Supplier", purchase.supplier],
              ["Mobile", purchase.supplierPhone],
              ["Supplier Invoice", purchase.supplierInvoice],
              ["Purchase Date", purchase.purchaseDate],
              ["Payment Mode", purchase.paymentMode],
              ["Payment Status", purchase.status],
            ].map(([label, value]) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-semibold text-slate-800 mt-1">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Purchased Products</h3>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full min-w-[600px] text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {["Product", "Packaging", "Qty", "Rate", "GST", "Amount"].map(
                      (heading) => (
                        <th key={heading} className="p-3 text-left">
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {purchase.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3">{item.productName}</td>
                      <td className="p-3">{item.packaging}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">{formatCurrency(item.rate)}</td>
                      <td className="p-3">{item.gst}%</td>
                      <td className="p-3 font-medium">
                        {formatCurrency(item.quantity * item.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="max-w-sm ml-auto bg-slate-50 rounded-xl p-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(purchase.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{formatCurrency(purchase.discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST</span>
              <span>{formatCurrency(purchase.gstAmount)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(purchase.total)}</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Paid</span>
              <span>{formatCurrency(purchase.paidAmount)}</span>
            </div>
            <div className="flex justify-between text-red-600 font-semibold">
              <span>Due</span>
              <span>{formatCurrency(purchase.dueAmount)}</span>
            </div>
          </div>

          {purchase.notes && (
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-slate-600">{purchase.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseView;
