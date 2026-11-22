
import React, { useEffect, useState } from "react";
import {
  Building2,
  Receipt,
  Calculator,
  Package,
  Bell,
  Shield,
  Save,
  RotateCcw,
  Store,
  FileText,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  company: {
    businessName: "LubeFlow Oil Store",
    ownerName: "",
    phone: "",
    email: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "Madhya Pradesh",
    pincode: "",
  },
  invoice: {
    prefix: "INV",
    startingNumber: 1001,
    footer: "Thank you for your business!",
    showLogo: true,
    showGst: true,
    showSignature: true,
  },
  tax: {
    gstEnabled: true,
    defaultGst: "18",
    inclusiveTax: false,
  },
  inventory: {
    lowStockAlert: true,
    defaultWarehouse: "Main Store",
    allowNegativeStock: false,
  },
  notifications: {
    lowStock: true,
    paymentDue: true,
    newSale: false,
  },
  preferences: {
    currency: "INR",
    dateFormat: "DD-MM-YYYY",
    language: "English",
  },
};

const sections = [
  { id: "company", label: "Business Profile", icon: Building2 },
  { id: "invoice", label: "Invoice Settings", icon: Receipt },
  { id: "tax", label: "Tax & GST", icon: Calculator },
  { id: "inventory", label: "Inventory Settings", icon: Package },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Store },
];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState("company");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lubeflow_settings");

    if (saved) {
      try {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(saved),
        });
      } catch {
        console.error("Unable to load saved settings");
      }
    }
  }, []);

  const updateField = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("lubeflow_settings", JSON.stringify(settings));
    setMessage("Settings saved successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    if (!window.confirm("Reset all settings to default values?")) return;

    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(
      "lubeflow_settings",
      JSON.stringify(DEFAULT_SETTINGS)
    );
    setMessage("Settings reset successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  const currentSection = sections.find(
    (item) => item.id === activeSection
  );

  const Field = ({ label, children }) => (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "company":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Business Information
              </h3>
              <p className="text-sm text-slate-500">
                Manage your oil shop business details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Business Name">
                <input
                  className={inputClass}
                  value={settings.company.businessName}
                  onChange={(e) =>
                    updateField("company", "businessName", e.target.value)
                  }
                />
              </Field>

              <Field label="Owner Name">
                <input
                  className={inputClass}
                  value={settings.company.ownerName}
                  onChange={(e) =>
                    updateField("company", "ownerName", e.target.value)
                  }
                />
              </Field>

              <Field label="Mobile Number">
                <input
                  className={inputClass}
                  value={settings.company.phone}
                  onChange={(e) =>
                    updateField("company", "phone", e.target.value)
                  }
                />
              </Field>

              <Field label="Email Address">
                <input
                  type="email"
                  className={inputClass}
                  value={settings.company.email}
                  onChange={(e) =>
                    updateField("company", "email", e.target.value)
                  }
                />
              </Field>

              <Field label="GSTIN">
                <input
                  className={inputClass}
                  value={settings.company.gstNumber}
                  onChange={(e) =>
                    updateField("company", "gstNumber", e.target.value)
                  }
                  placeholder="Enter GST number"
                />
              </Field>

              <Field label="State">
                <input
                  className={inputClass}
                  value={settings.company.state}
                  onChange={(e) =>
                    updateField("company", "state", e.target.value)
                  }
                />
              </Field>

              <Field label="City">
                <input
                  className={inputClass}
                  value={settings.company.city}
                  onChange={(e) =>
                    updateField("company", "city", e.target.value)
                  }
                />
              </Field>

              <Field label="PIN Code">
                <input
                  className={inputClass}
                  value={settings.company.pincode}
                  onChange={(e) =>
                    updateField("company", "pincode", e.target.value)
                  }
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Business Address">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={settings.company.address}
                    onChange={(e) =>
                      updateField("company", "address", e.target.value)
                    }
                  />
                </Field>
              </div>
            </div>
          </div>
        );

      case "invoice":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Invoice Configuration
              </h3>
              <p className="text-sm text-slate-500">
                Customize sales invoice details and printing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Invoice Prefix">
                <input
                  className={inputClass}
                  value={settings.invoice.prefix}
                  onChange={(e) =>
                    updateField("invoice", "prefix", e.target.value)
                  }
                />
              </Field>

              <Field label="Starting Invoice Number">
                <input
                  type="number"
                  min="1"
                  className={inputClass}
                  value={settings.invoice.startingNumber}
                  onChange={(e) =>
                    updateField(
                      "invoice",
                      "startingNumber",
                      Number(e.target.value)
                    )
                  }
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="Invoice Footer Message">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={settings.invoice.footer}
                    onChange={(e) =>
                      updateField("invoice", "footer", e.target.value)
                    }
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 px-4">
              <Toggle
                label="Show Business Logo"
                description="Display business logo on printed invoices."
                checked={settings.invoice.showLogo}
                onChange={(v) => updateField("invoice", "showLogo", v)}
              />
              <Toggle
                label="Show GST Details"
                description="Display GST breakdown on invoices."
                checked={settings.invoice.showGst}
                onChange={(v) => updateField("invoice", "showGst", v)}
              />
              <Toggle
                label="Show Authorized Signature"
                description="Reserve space for signature on invoices."
                checked={settings.invoice.showSignature}
                onChange={(v) =>
                  updateField("invoice", "showSignature", v)
                }
              />
            </div>
          </div>
        );

      case "tax":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Tax & GST Configuration
              </h3>
              <p className="text-sm text-slate-500">
                Configure default tax preferences.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 px-4">
              <Toggle
                label="Enable GST"
                description="Enable GST calculation in sales and purchase forms."
                checked={settings.tax.gstEnabled}
                onChange={(v) => updateField("tax", "gstEnabled", v)}
              />
              <Toggle
                label="Prices Include GST"
                description="Treat entered prices as GST-inclusive by default."
                checked={settings.tax.inclusiveTax}
                onChange={(v) => updateField("tax", "inclusiveTax", v)}
              />
            </div>

            <Field label="Default GST Rate">
              <select
                className={inputClass}
                value={settings.tax.defaultGst}
                onChange={(e) =>
                  updateField("tax", "defaultGst", e.target.value)
                }
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </Field>

            <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              Apply the legally applicable GST rate for each product and
              HSN classification. This default is only a starting preference.
            </p>
          </div>
        );

      case "inventory":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Inventory Configuration
              </h3>
              <p className="text-sm text-slate-500">
                Configure stock management behavior.
              </p>
            </div>

            <Field label="Default Warehouse">
              <input
                className={inputClass}
                value={settings.inventory.defaultWarehouse}
                onChange={(e) =>
                  updateField("inventory", "defaultWarehouse", e.target.value)
                }
              />
            </Field>

            <div className="rounded-xl border border-slate-200 px-4">
              <Toggle
                label="Low Stock Alert"
                description="Notify when product stock reaches minimum quantity."
                checked={settings.inventory.lowStockAlert}
                onChange={(v) =>
                  updateField("inventory", "lowStockAlert", v)
                }
              />
              <Toggle
                label="Allow Negative Stock"
                description="Allow sales when available stock is insufficient."
                checked={settings.inventory.allowNegativeStock}
                onChange={(v) =>
                  updateField("inventory", "allowNegativeStock", v)
                }
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Notification Preferences
              </h3>
              <p className="text-sm text-slate-500">
                Select which alerts you want to receive.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 px-4">
              <Toggle
                label="Low Stock Notification"
                description="Get alerts for products running low."
                checked={settings.notifications.lowStock}
                onChange={(v) =>
                  updateField("notifications", "lowStock", v)
                }
              />
              <Toggle
                label="Payment Due Reminder"
                description="Get reminders for pending customer payments."
                checked={settings.notifications.paymentDue}
                onChange={(v) =>
                  updateField("notifications", "paymentDue", v)
                }
              />
              <Toggle
                label="New Sale Notification"
                description="Receive an alert when a new sale is recorded."
                checked={settings.notifications.newSale}
                onChange={(v) =>
                  updateField("notifications", "newSale", v)
                }
              />
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                System Preferences
              </h3>
              <p className="text-sm text-slate-500">
                Customize your application preferences.
              </p>
            </div>

            <Field label="Currency">
              <select
                className={inputClass}
                value={settings.preferences.currency}
                onChange={(e) =>
                  updateField("preferences", "currency", e.target.value)
                }
              >
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="USD">USD - US Dollar ($)</option>
              </select>
            </Field>

            <Field label="Date Format">
              <select
                className={inputClass}
                value={settings.preferences.dateFormat}
                onChange={(e) =>
                  updateField("preferences", "dateFormat", e.target.value)
                }
              >
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </Field>

            <Field label="Language">
              <select
                className={inputClass}
                value={settings.preferences.language}
                onChange={(e) =>
                  updateField("preferences", "language", e.target.value)
                }
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </Field>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-100 p-2.5 text-blue-700">
              <Building2 size={22} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Manage your business and application configuration.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {message && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            General Settings
          </p>

          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-slate-600">
              <Shield size={16} />
              <span className="text-xs font-semibold">LubeFlow ERP</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Business configuration panel
            </p>
          </div>
        </aside>

        <main className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            {currentSection && (
              <>
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                  <currentSection.icon size={21} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">
                    {currentSection.label}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure {currentSection.label.toLowerCase()}
                  </p>
                </div>
              </>
            )}
          </div>

          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default SettingsDashboard;
