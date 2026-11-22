
let suppliers = [
  {
    id: 1,
    supplierCode: "SUP-001",
    companyName: "Castrol India Distributor",
    supplierType: "DISTRIBUTOR",
    contactPerson: "Amit Sharma",
    phone: "9876543210",
    alternatePhone: "9876501234",
    email: "castrol@example.com",
    gstin: "23ABCDE1234F1Z5",
    state: "Madhya Pradesh",
    city: "Bhopal",
    address: "MP Nagar, Bhopal",
    pincode: "462001",
    paymentTerms: "30 DAYS",
    creditLimit: 200000,
    outstanding: 45000,
    status: "ACTIVE",
    notes: "Authorized Castrol distributor",
  },
  {
    id: 2,
    supplierCode: "SUP-002",
    companyName: "Mobil Oil Traders",
    supplierType: "WHOLESALER",
    contactPerson: "Rajesh Gupta",
    phone: "9876501234",
    alternatePhone: "",
    email: "mobil@example.com",
    gstin: "07ABCDE1234F1Z2",
    state: "Delhi",
    city: "New Delhi",
    address: "Karol Bagh, Delhi",
    pincode: "110005",
    paymentTerms: "15 DAYS",
    creditLimit: 100000,
    outstanding: 20000,
    status: "ACTIVE",
    notes: "",
  },
  {
    id: 3,
    supplierCode: "SUP-003",
    companyName: "Shell Lubricants Agency",
    supplierType: "DISTRIBUTOR",
    contactPerson: "Vikash Singh",
    phone: "9811122233",
    alternatePhone: "",
    email: "shell@example.com",
    gstin: "09ABCDE1234F1Z8",
    state: "Uttar Pradesh",
    city: "Ghaziabad",
    address: "Industrial Area, Ghaziabad",
    pincode: "201010",
    paymentTerms: "CASH",
    creditLimit: 0,
    outstanding: 0,
    status: "ACTIVE",
    notes: "Shell oil distributor",
  },
  {
    id: 4,
    supplierCode: "SUP-004",
    companyName: "HP Lubricants Supplier",
    supplierType: "MANUFACTURER",
    contactPerson: "Suresh Verma",
    phone: "9898989898",
    alternatePhone: "",
    email: "hp@example.com",
    gstin: "23ABCDE1234F1Z9",
    state: "Madhya Pradesh",
    city: "Indore",
    address: "Vijay Nagar, Indore",
    pincode: "452010",
    paymentTerms: "7 DAYS",
    creditLimit: 150000,
    outstanding: 30000,
    status: "ACTIVE",
    notes: "",
  },
];

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getSuppliers = async () => {
  await delay();
  return [...suppliers];
};

export const getSupplierById = async (id) => {
  await delay();
  return suppliers.find((item) => item.id === Number(id));
};

export const addSupplier = async (payload) => {
  await delay();

  const newSupplier = {
    ...payload,
    id: Date.now(),
    supplierCode: `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
    outstanding: 0,
  };

  suppliers = [newSupplier, ...suppliers];
  return newSupplier;
};

export const updateSupplier = async (id, payload) => {
  await delay();

  suppliers = suppliers.map((item) =>
    item.id === Number(id)
      ? {
          ...item,
          ...payload,
          id: Number(id),
          supplierCode: item.supplierCode,
          outstanding: item.outstanding,
        }
      : item
  );

  return getSupplierById(id);
};

export const deleteSupplier = async (id) => {
  await delay();

  const supplier = suppliers.find(
    (item) => item.id === Number(id)
  );

  if (supplier?.outstanding > 0) {
    throw new Error(
      "Supplier has outstanding payable. Settle the balance before deactivating."
    );
  }

  suppliers = suppliers.map((item) =>
    item.id === Number(id)
      ? { ...item, status: "INACTIVE" }
      : item
  );

  return true;
};
