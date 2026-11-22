
import React from "react";

import DashboardOverview from "../../modules/dashboard/component/DashboardOverview";
import ModulePlaceholder from "./ModulePlaceholder";
import ProductList from
  "../../modules/products/pages/ProductList";
  import SalesList from "../../modules/sales/pages/SalesList";
import PurchaseList from "../../modules/purchase/pages/PurchaseList";
import InventoryList from "../../modules/inventory/pages/InventoryList";
import CustomerList from "../../modules/customers/pages/CustomerList";
import SupplierList from "../../modules/suppliers/pages/SupplierList";
import ReportsDashboard from "../../modules/reports/pages/ReportsDashboard";
import SettingsDashboard from "../../modules/settings/pages/SettingsDashboard";



// Central component registry
const moduleRegistry = {
  Dashboard: DashboardOverview,

  Products: ProductList,
  Sales: SalesList ,
  Purchase: PurchaseList,
  Inventory: InventoryList,
  Customers: CustomerList,
  Suppliers: SupplierList,
  Reports: ReportsDashboard,
  Settings: SettingsDashboard,
  Expenses: ModulePlaceholder,
  Employees: ModulePlaceholder,
};

const ModuleRenderer = ({
  activeMenu,
  user,
  stats,
  quickActions,
  onQuickAction,
}) => {
  const ActiveComponent =
    moduleRegistry[activeMenu] || ModulePlaceholder;

  return (
    <ActiveComponent
      moduleName={activeMenu}
      user={user}
      stats={stats}
      quickActions={quickActions}
      onQuickAction={onQuickAction}
    />
  );
};

export default ModuleRenderer;
