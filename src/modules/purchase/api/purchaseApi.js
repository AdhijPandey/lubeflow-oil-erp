
let purchases = [
  {
    id: 1,
    purchaseNo: "PUR-2026-001",
    supplier: "Shree Balaji Traders",
    supplierPhone: "9876543210",
    supplierInvoice: "INV-4582",
    purchaseDate: "2026-11-18",
    items: [
      {
        productId: 1,
        productName: "Castrol Power1 Ultimate",
        packaging: "1 Litre Bottle",
        quantity: 50,
        rate: 420,
        gst: 18,
      },
      {
        productId: 2,
        productName: "Mobil Super 1000",
        packaging: "5 Litre Can",
        quantity: 10,
        rate: 1250,
        gst: 18,
      },
    ],
    subtotal: 33500,
    discount: 500,
    gstAmount: 5940,
    total: 38940,
    paidAmount: 20000,
    dueAmount: 18940,
    paymentMode: "BANK",
    status: "PARTIAL",
    notes: "Regular stock purchase",
  },
  {
    id: 2,
    purchaseNo: "PUR-2026-002",
    supplier: "Gupta Oil Distributors",
    supplierPhone: "9876501234",
    supplierInvoice: "GOD-1092",
    purchaseDate: "2026-11-19",
    items: [
      {
        productId: 3,
        productName: "Shell Spirax Gear Oil",
        packaging: "1 Litre Bottle",
        quantity: 30,
        rate: 310,
        gst: 18,
      },
    ],
    subtotal: 9300,
    discount: 0,
    gstAmount: 1674,
    total: 10974,
    paidAmount: 10974,
    dueAmount: 0,
    paymentMode: "UPI",
    status: "PAID",
    notes: "",
  },
];

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getPurchases = async () => {
  await delay();
  return [...purchases];
};

export const getPurchaseById = async (id) => {
  await delay();
  return purchases.find((item) => item.id === Number(id));
};

export const addPurchase = async (payload) => {
  await delay();

  const newPurchase = {
    ...payload,
    id: Date.now(),
    purchaseNo: `PUR-${new Date().getFullYear()}-${String(
      purchases.length + 1
    ).padStart(3, "0")}`,
  };

  purchases = [newPurchase, ...purchases];
  return newPurchase;
};

export const updatePurchase = async (id, payload) => {
  await delay();

  purchases = purchases.map((item) =>
    item.id === Number(id)
      ? { ...payload, id: Number(id), purchaseNo: item.purchaseNo }
      : item
  );

  return getPurchaseById(id);
};

export const deletePurchase = async (id) => {
  await delay();

  purchases = purchases.filter(
    (item) => item.id !== Number(id)
  );

  return true;
};
