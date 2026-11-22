
import React, { useState } from "react";
import { X } from "lucide-react";

const StockAdjustmentForm = ({
  item,
  type,
  onClose,
  onSave,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState(
    type === "IN" ? "Purchase" : "Damaged / Expired"
  );
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  if (!item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const qty = Number(quantity);

    if (!Number.isFinite(qty) || qty <= 0) {
      setError("Enter a valid quantity.");
      return;
    }

    if (type === "OUT" && qty > item.availableStock) {
      setError("Quantity cannot exceed available stock.");
      return;
    }

    try {
      await onSave({
        inventoryId: item.id,
        type,
        quantity: qty,
        reason,
        reference,
      });
    } catch (err) {
      setError(err.message || "Unable to adjust stock.");
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">
        <div className="border-b p-5 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Stock {type === "IN" ? "In" : "Out"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {item.productName}
            </p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 flex justify-between">
            <span className="text-sm text-slate-500">
              Current Available Stock
            </span>
            <strong>{item.availableStock}</strong>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity *
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Reason *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={inputClass}
            >
              {(
                type === "IN"
                  ? ["Purchase", "Sales Return", "Opening Stock", "Manual Adjustment"]
                  : ["Sales", "Damaged / Expired", "Supplier Return", "Manual Adjustment"]
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Reference Number
            </label>
            <input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className={inputClass}
              placeholder="Invoice / reference number"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-5 py-2.5 text-white rounded-lg ${
                type === "IN"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Confirm Stock {type === "IN" ? "In" : "Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentForm;
