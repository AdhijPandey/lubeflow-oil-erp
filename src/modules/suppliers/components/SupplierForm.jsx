
import React, { useState } from "react";
import { X } from "lucide-react";

const SupplierForm = ({ supplier, onClose, onSave }) => {
  const [form, setForm] = useState({
    companyName: supplier?.companyName || "",
    supplierType: supplier?.supplierType || "DISTRIBUTOR",
    contactPerson: supplier?.contactPerson || "",
    phone: supplier?.phone || "",
    alternatePhone: supplier?.alternatePhone || "",
    email: supplier?.email || "",
    gstin: supplier?.gstin || "",
    state: supplier?.state || "",
    city: supplier?.city || "",
    address: supplier?.address || "",
    pincode: supplier?.pincode || "",
    paymentTerms: supplier?.paymentTerms || "CASH",
    creditLimit: supplier?.creditLimit ?? 0,
    status: supplier?.status || "ACTIVE",
    notes: supplier?.notes || "",
  });

  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.companyName.trim()) {
      setError("Supplier company name is required.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (
      form.alternatePhone &&
      !/^[6-9]\d{9}$/.test(form.alternatePhone)
    ) {
      setError("Enter a valid alternate mobile number.");
      return;
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      setError("Enter a valid email address.");
      return;
    }

    if (
      form.gstin &&
      !/^[0-9A-Z]{15}$/.test(form.gstin.toUpperCase())
    ) {
      setError("GSTIN must contain 15 alphanumeric characters.");
      return;
    }

    if (
      !Number.isFinite(Number(form.creditLimit)) ||
      Number(form.creditLimit) < 0
    ) {
      setError("Credit limit must be zero or greater.");
      return;
    }

    onSave({
      ...form,
      companyName: form.companyName.trim(),
      phone: form.phone.trim(),
      gstin: form.gstin.toUpperCase().trim(),
      creditLimit: Number(form.creditLimit),
    });
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const Field = ({ label, children }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {supplier ? "Edit Supplier" : "Add New Supplier"}
            </h2>
            <p className="text-sm text-slate-500">
              Enter supplier company and payment details
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
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Company Name *">
                <input
                  value={form.companyName}
                  onChange={(e) =>
                    updateField("companyName", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Enter company name"
                />
              </Field>

              <Field label="Supplier Type">
                <select
                  value={form.supplierType}
                  onChange={(e) =>
                    updateField("supplierType", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="MANUFACTURER">Manufacturer</option>
                  <option value="WHOLESALER">Wholesaler</option>
                  <option value="RETAILER">Retailer</option>
                  <option value="OTHER">Other</option>
                </select>
              </Field>

              <Field label="Contact Person">
                <input
                  value={form.contactPerson}
                  onChange={(e) =>
                    updateField("contactPerson", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Contact person"
                />
              </Field>

              <Field label="Mobile Number *">
                <input
                  value={form.phone}
                  maxLength={10}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  className={inputClass}
                  placeholder="10-digit mobile"
                />
              </Field>

              <Field label="Alternate Mobile">
                <input
                  value={form.alternatePhone}
                  maxLength={10}
                  onChange={(e) =>
                    updateField(
                      "alternatePhone",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  className={inputClass}
                  placeholder="Alternate number"
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass}
                  placeholder="company@example.com"
                />
              </Field>

              <Field label="GSTIN">
                <input
                  value={form.gstin}
                  maxLength={15}
                  onChange={(e) =>
                    updateField("gstin", e.target.value.toUpperCase())
                  }
                  className={inputClass}
                  placeholder="15-character GSTIN"
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-slate-800 mb-4">
              Address Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Address">
                <input
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className={inputClass}
                  placeholder="Street / Area"
                />
              </Field>

              <Field label="City">
                <input
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className={inputClass}
                  placeholder="City"
                />
              </Field>

              <Field label="State">
                <input
                  value={form.state}
                  onChange={(e) => updateField("state", e.target.value)}
                  className={inputClass}
                  placeholder="State"
                />
              </Field>

              <Field label="PIN Code">
                <input
                  value={form.pincode}
                  maxLength={6}
                  onChange={(e) =>
                    updateField("pincode", e.target.value.replace(/\D/g, ""))
                  }
                  className={inputClass}
                  placeholder="6-digit PIN"
                />
              </Field>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-slate-800 mb-4">
              Payment & Account Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Payment Terms">
                <select
                  value={form.paymentTerms}
                  onChange={(e) =>
                    updateField("paymentTerms", e.target.value)
                  }
                  className={inputClass}
                >
                  <option value="CASH">Cash / Immediate</option>
                  <option value="7 DAYS">7 Days</option>
                  <option value="15 DAYS">15 Days</option>
                  <option value="30 DAYS">30 Days</option>
                  <option value="45 DAYS">45 Days</option>
                  <option value="60 DAYS">60 Days</option>
                </select>
              </Field>

              <Field label="Credit Limit (₹)">
                <input
                  type="number"
                  min="0"
                  value={form.creditLimit}
                  onChange={(e) =>
                    updateField("creditLimit", e.target.value)
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Supplier Status">
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className={inputClass}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </Field>

              <div className="md:col-span-2 lg:col-span-3">
                <Field label="Notes">
                  <textarea
                    rows="3"
                    value={form.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    className={inputClass}
                    placeholder="Additional supplier information..."
                  />
                </Field>
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
              className="px-5 py-2.5 border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {supplier ? "Update Supplier" : "Save Supplier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
