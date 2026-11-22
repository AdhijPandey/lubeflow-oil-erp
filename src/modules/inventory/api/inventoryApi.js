
let inventory = [
  {
    id: 1,
    productId: 1,
    sku: "ENG-001",
    productName: "Castrol Power1 Ultimate",
    brand: "Castrol",
    category: "Bike Engine Oil",
    packaging: "1 Litre Bottle",
    openingStock: 30,
    stockIn: 25,
    stockOut: 10,
    availableStock: 45,
    minStock: 10,
    purchaseRate: 420,
    sellingRate: 550,
    location: "Main Store",
  },
  {
    id: 2,
    productId: 2,
    sku: "ENG-002",
    productName: "Mobil Super 1000",
    brand: "Mobil",
    category: "Car Engine Oil",
    packaging: "5 Litre Can",
    openingStock: 15,
    stockIn: 5,
    stockOut: 12,
    availableStock: 8,
    minStock: 15,
    purchaseRate: 1250,
    sellingRate: 1550,
    location: "Main Store",
  },
  {
    id: 3,
    productId: 3,
    sku: "GEAR-001",
    productName: "Shell Spirax Gear Oil",
    brand: "Shell",
    category: "Gear Oil",
    packaging: "1 Litre Bottle",
    openingStock: 20,
    stockIn: 0,
    stockOut: 20,
    availableStock: 0,
    minStock: 10,
    purchaseRate: 310,
    sellingRate: 420,
    location: "Main Store",
  },
  {
    id: 4,
    productId: 4,
    sku: "TRC-001",
    productName: "HP Milcy Turbo",
    brand: "HP",
    category: "Tractor Engine Oil",
    packaging: "15 Litre Tin",
    openingStock: 20,
    stockIn: 15,
    stockOut: 10,
    availableStock: 25,
    minStock: 8,
    purchaseRate: 2100,
    sellingRate: 2600,
    location: "Main Store",
  },
  {
    id: 5,
    productId: 5,
    sku: "DRM-001",
    productName: "Servo Engine Oil",
    brand: "Servo",
    category: "Industrial Oil",
    packaging: "200 Litre Drum",
    openingStock: 5,
    stockIn: 2,
    stockOut: 2,
    availableStock: 5,
    minStock: 3,
    purchaseRate: 28000,
    sellingRate: 32000,
    location: "Warehouse",
  },
];

let movements = [];

export const getInventory = async () => {
  return [...inventory];
};

export const getInventoryById = async (id) => {
  return inventory.find((item) => item.id === Number(id));
};

export const getStockMovements = async () => {
  return [...movements].reverse();
};

export const adjustStock = async ({
  inventoryId,
  type,
  quantity,
  reason,
  reference,
}) => {
  const item = inventory.find(
    (product) => product.id === Number(inventoryId)
  );

  if (!item) throw new Error("Inventory product not found.");

  const qty = Number(quantity);

  if (!Number.isFinite(qty) || qty <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  if (type === "OUT" && item.availableStock < qty) {
    throw new Error("Insufficient stock available.");
  }

  if (type === "IN") {
    item.availableStock += qty;
    item.stockIn += qty;
  } else if (type === "OUT") {
    item.availableStock -= qty;
    item.stockOut += qty;
  } else {
    throw new Error("Invalid stock movement type.");
  }

  const movement = {
    id: Date.now(),
    inventoryId: item.id,
    productName: item.productName,
    sku: item.sku,
    type,
    quantity: qty,
    reason,
    reference,
    date: new Date().toISOString(),
    balance: item.availableStock,
  };

  movements.push(movement);

  return movement;
};
