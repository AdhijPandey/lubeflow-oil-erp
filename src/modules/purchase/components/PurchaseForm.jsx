
import React, { useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

import {
  calculatePurchaseTotals,
  formatCurrency,
} from "../utils/purchaseHelpers";

const demoProducts = [
  {
    id: 1,
    name: "Castrol Power1 Ultimate",
    packaging: "1 Litre Bottle",
    rate: 420,
    gst: 18,
  },
  {
    id: 2,
    name: "Mobil Super 1000",
    packaging: "5 Litre Can",
    rate: 1250,
    gst: 18,
  },
  {
    id: 3,
    name: "Shell Spirax Gear Oil",
    packaging: "1 Litre Bottle",
    rate: 310,
    gst: 18,
  },
  {
    id: 4,
    name: "HP Milcy Turbo",
    packaging: "15 Litre Tin",
    rate: 2100,
    gst: 18,
  },
  {
    id: 5,
    name: "Servo Engine Oil",
    packaging: "200 Litre Drum",
    rate: 28000,
    gst: 18,
  },
];

const emptyItem = () => ({
  productId: "",
  productName: "",
  packaging: "",
  quantity: 1,
  rate: 0,
  gst: 18,
});

const PurchaseForm = ({ purchase, onClose, onSave }) => {
  const [form, setForm] = useState(() => ({
    supplier: purchase?.supplier || "",
    supplierPhone: purchase?.supplierPhone || "",
    supplierInvoice: purchase?.supplierInvoice || "",
    purchaseDate:
      purchase?.purchaseDate ||
      new Date().toISOString().slice(0, 10),
    items: purchase?.items?.length
      ? purchase.items.map((item) => ({ ...item }))
      : [emptyItem()],
    discount: purchase?.discount || 0,
    paidAmount: purchase?.paidAmount || 0,
    paymentMode: purchase?.paymentMode || "CASH",
    notes: purchase?.notes || "",
  }));

  const [error, setError] = useState("");

  const totals = useMemo(
    () => calculatePurchaseTotals(form.items, form.discount),
    [form.items, form.discount]
  );

  const dueAmount = Math.max(
    0,
    totals.total - Number(form.paidAmount || 0)
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateItem = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const selectProduct = (index, productId) => {
    const product = demoProducts.find(
      (item) => item.id === Number(productId)
    );

    if (!product) return;

    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index
          ? {
              ...item,
              productId: product.id,
              productName: product.name,
              packaging: product.packaging,
              rate: product.rate,
              gst: product.gst,
            }
          : item
      ),
    }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, emptyItem()],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items:
        prev.items.length === 1
          ? prev.items
          : prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.supplier.trim()) {
      setError("Please enter supplier name.");
      return;
    }

    if (!form.supplierInvoice.trim()) {
      setError("Please enter supplier invoice number.");
      return;
    }

    if (
      form.items.some(
        (item) =>
          !item.productId ||
          Number(item.quantity) <= 0 ||
          Number(item.rate) < 0
      )
    ) {
      setError("Please select products and enter valid quantities and rates.");
      return;
    }

    if (
      Number(form.paidAmount) < 0 ||
      Number(form.paidAmount) > totals.total
    ) {
      setError("Paid amount cannot exceed the purchase total.");
      return;
    }

    const status =
      Number(form.paidAmount) === 0
        ? "UNPAID"
        : Number(form.paidAmount) >= totals.total
        ? "PAID"
        : "PARTIAL";

    onSave({
      ...form,
      supplier: form.supplier.trim(),
      subtotal: totals.subtotal,
      discount: totals.discount,
      gstAmount: totals.gstAmount,
      total: totals.total,
      paidAmount: Number(form.paidAmount),
      dueAmount,
      status,
    });
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {purchase ? "Edit Purchase" : "New Purchase"}
            </h2>
            <p className="text-sm text-slate-500">
              Enter supplier and purchase details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <section>
            <h3 className="font-semibold text-slate-800 mb-4">
              Supplier Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Supplier Name *
                </label>
                <input
                  value={form.supplier}
                  onChange={(e) => updateField("supplier", e.target.value)}
                  className={inputClass}
                  placeholder="Supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  value={form.supplierPhone}
                  onChange={(e) =>
                    updateField("supplierPhone", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Supplier Invoice No. *
                </label>
                <input
                  value={form.supplierInvoice}
                  onChange={(e) =>
                    updateField("supplierInvoice", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Invoice number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Purchase Date *
                </label>
                <input
                  type="date"
                  value={form.purchaseDate}
                  onChange={(e) =>
                    updateField("purchaseDate", e.target.value)
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800">
                Purchase Items
              </h3>

              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus size={16} />
                Add Product
              </button>
            </div>

            <div className="space-y-3">
              {form.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 border border-slate-200 rounded-xl p-4"
                >
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium mb-1">
                      Product
                    </label>

                    <select
                      value={item.productId}
                      onChange={(e) =>
                        selectProduct(index, e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="">Select Product</option>
                      {demoProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>

                    {item.packaging && (
                      <p className="text-xs text-slate-400 mt-1">
                        {item.packaging}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Purchase Rate
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(index, "rate", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">
                      GST %
                    </label>
                    <select
                      value={item.gst}
                      onChange={(e) =>
                        updateItem(index, "gst", e.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Amount
                    </label>
                    <div className="py-2.5 font-semibold text-slate-700">
                      {formatCurrency(
                        Number(item.quantity || 0) *
                          Number(item.rate || 0)
                      )}
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={form.items.length === 1}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">
                Payment Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={form.paymentMode}
                    onChange={(e) =>
                      updateField("paymentMode", e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="CASH">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="BANK">Bank Transfer</option>
                    <option value="CHEQUE">Cheque</option>
                    <option value="CREDIT">Credit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={totals.total}
                    value={form.paidAmount}
                    onChange={(e) =>
                      updateField("paidAmount", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className={inputClass}
                    placeholder="Purchase notes..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <h3 className="font-semibold text-slate-800 mb-4">
                Purchase Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Discount</span>
                  <input
                    type="number"
                    min="0"
                    max={totals.subtotal}
                    value={form.discount}
                    onChange={(e) =>
                      updateField("discount", e.target.value)
                    }
                    className="w-28 text-right px-2 py-1.5 border rounded-lg"
                  />
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">GST Amount</span>
                  <span>{formatCurrency(totals.gstAmount)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span className="text-blue-700">
                    {formatCurrency(totals.total)}
                  </span>
                </div>

                <div className="flex justify-between text-green-700">
                  <span>Paid Amount</span>
                  <span>{formatCurrency(form.paidAmount)}</span>
                </div>

                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Due Amount</span>
                  <span>{formatCurrency(dueAmount)}</span>
                </div>
              </div>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {purchase ? "Update Purchase" : "Save Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
