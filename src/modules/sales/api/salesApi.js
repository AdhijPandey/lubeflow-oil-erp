
const initialSales = [
  {
    id: 1,
    invoiceNo: "INV-2026-001",
    date: "2026-11-20",
    customer: "Rahul Motors",
    phone: "9876543210",
    saleType: "WHOLESALE",
    items: [
      {
        productName: "Castrol Power1 Ultimate",
        sku: "ENG-001",
        quantity: 5,
        unit: "1 Litre Bottle",
        price: 510,
        gst: 18,
      },
    ],
    subtotal: 2550,
    discount: 100,
    gstAmount: 441,
    total: 2891,
    paid: 2891,
    due: 0,
    paymentMode: "UPI",
    status: "PAID",
  },
  {
    id: 2,
    invoiceNo: "INV-2026-002",
    date: "2026-11-21",
    customer: "Amit Kumar",
    phone: "9876543211",
    saleType: "RETAIL",
    items: [
      {
        productName: "Mobil Super 1000",
        sku: "ENG-002",
        quantity: 2,
        unit: "5 Litre Can",
        price: 1550,
        gst: 18,
      },
    ],
    subtotal: 3100,
    discount: 0,
    gstAmount: 558,
    total: 3658,
    paid: 2000,
    due: 1658,
    paymentMode: "CASH",
    status: "PARTIAL",
  },
  {
    id: 3,
    invoiceNo: "INV-2026-003",
    date: "2026-11-22",
    customer: "Sharma Auto Parts",
    phone: "9876543212",
    saleType: "WHOLESALE",
    items: [
      {
        productName: "Shell Spirax Gear Oil",
        sku: "GEAR-001",
        quantity: 10,
        unit: "1 Litre Bottle",
        price: 390,
        gst: 18,
      },
    ],
    subtotal: 3900,
    discount: 200,
    gstAmount: 666,
    total: 4366,
    paid: 0,
    due: 4366,
    paymentMode: "CREDIT",
    status: "UNPAID",
  },
];

let sales = [...initialSales];

const delay = (ms = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getSales = async () => {
  await delay();
  return [...sales];
};

export const getSaleById = async (id) => {
  await delay();
  return sales.find((sale) => sale.id === Number(id));
};

export const createSale = async (payload) => {
  await delay();

  const newSale = {
    ...payload,
    id: Date.now(),
  };

  sales = [newSale, ...sales];

  return newSale;
};

export const updateSale = async (id, payload) => {
  await delay();

  sales = sales.map((sale) =>
    sale.id === Number(id)
      ? { ...sale, ...payload, id: Number(id) }
      : sale
  );

  return getSaleById(id);
};

export const deleteSale = async (id) => {
  await delay();

  sales = sales.filter(
    (sale) => sale.id !== Number(id)
  );

  return true;
};
