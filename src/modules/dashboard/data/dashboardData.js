import {
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  Wallet,
  Truck,
  Boxes,
  ClipboardList,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "Today's Sales",
    value: "₹ 24,850",
    change: "+12.5% from yesterday",
    icon: IndianRupee,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    trend: "up",
  },
  {
    title: "Monthly Sales",
    value: "₹ 4,82,500",
    change: "Current month",
    icon: TrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Stock Items",
    value: "1,248",
    change: "Across all products",
    icon: Package,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Low Stock Products",
    value: "12",
    change: "Restock required",
    icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    alert: true,
  },
  {
    title: "Today's Purchase",
    value: "₹ 18,400",
    change: "Purchase entries today",
    icon: ShoppingCart,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Customer Dues",
    value: "₹ 36,250",
    change: "Amount to be collected",
    icon: Wallet,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
];

export const quickActions = [
  { name: "Add Product", icon: Package },
  { name: "New Sale", icon: ShoppingCart },
  { name: "Purchase Entry", icon: Truck },
  { name: "Add Stock", icon: Boxes },
  { name: "Add Customer", icon: Users },
  { name: "View Reports", icon: ClipboardList },
];

export const inventoryData = [
  { name: "Engine Oil", quantity: 420, unit: "Litre", percentage: 84, color: "bg-blue-500" },
  { name: "Gear Oil", quantity: 185, unit: "Litre", percentage: 62, color: "bg-purple-500" },
  { name: "Coolant", quantity: 96, unit: "Litre", percentage: 48, color: "bg-green-500" },
  { name: "Brake Oil", quantity: 34, unit: "Litre", percentage: 22, color: "bg-orange-500" },
];

export const lowStockItems = [
  { id: 1, name: "Castrol GTX 15W-40", brand: "Castrol", stock: 4, minimum: 15, unit: "Litre" },
  { id: 2, name: "Shell Advance 10W-30", brand: "Shell", stock: 6, minimum: 20, unit: "Litre" },
  { id: 3, name: "Servo Gear HP 90", brand: "Servo", stock: 3, minimum: 10, unit: "Litre" },
  { id: 4, name: "Coolant Green", brand: "Other", stock: 2, minimum: 8, unit: "Bottle" },
];

export const recentTransactions = [
  { id: "SAL-1025", customer: "Sharma Auto Parts", type: "Sale", amount: "₹ 5,400", time: "10:45 AM", status: "Paid" },
  { id: "PUR-0452", customer: "Castrol Distributor", type: "Purchase", amount: "₹ 12,500", time: "11:20 AM", status: "Completed" },
  { id: "SAL-1024", customer: "Amit Motors", type: "Sale", amount: "₹ 2,850", time: "12:10 PM", status: "Credit" },
  { id: "SAL-1023", customer: "Ravi Auto Garage", type: "Sale", amount: "₹ 1,600", time: "01:15 PM", status: "Paid" },
];