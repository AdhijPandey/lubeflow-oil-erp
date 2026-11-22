
let customers = [
  {
    id: 1,
    customerCode: "CUS-001",
    name: "Rahul Motors",
    type: "WHOLESALE",
    contactPerson: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    gstin: "23ABCDE1234F1Z5",
    state: "Madhya Pradesh",
    city: "Bhopal",
    address: "MP Nagar, Bhopal",
    pincode: "462001",
    creditLimit: 100000,
    outstanding: 15000,
    status: "ACTIVE",
    notes: "Regular wholesale customer",
  },
  {
    id: 2,
    customerCode: "CUS-002",
    name: "Amit Kumar",
    type: "RETAIL",
    contactPerson: "Amit Kumar",
    phone: "9876501234",
    email: "amit@example.com",
    gstin: "",
    state: "Delhi",
    city: "New Delhi",
    address: "Laxmi Nagar, Delhi",
    pincode: "110092",
    creditLimit: 10000,
    outstanding: 2500,
    status: "ACTIVE",
    notes: "",
  },
  {
    id: 3,
    customerCode: "CUS-003",
    name: "Sharma Auto Parts",
    type: "WHOLESALE",
    contactPerson: "Vikash Sharma",
    phone: "9811122233",
    email: "sharma@example.com",
    gstin: "07ABCDE1234F1Z2",
    state: "Delhi",
    city: "Delhi",
    address: "Karol Bagh, Delhi",
    pincode: "110005",
    creditLimit: 150000,
    outstanding: 0,
    status: "ACTIVE",
    notes: "Bulk orders",
  },
  {
    id: 4,
    customerCode: "CUS-004",
    name: "Ramesh Auto Garage",
    type: "RETAIL",
    contactPerson: "Ramesh",
    phone: "9898989898",
    email: "",
    gstin: "",
    state: "Uttar Pradesh",
    city: "Ghaziabad",
    address: "Vaishali, Ghaziabad",
    pincode: "201010",
    creditLimit: 5000,
    outstanding: 0,
    status: "INACTIVE",
    notes: "",
  },
];

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getCustomers = async () => {
  await delay();
  return [...customers];
};

export const getCustomerById = async (id) => {
  await delay();
  return customers.find((item) => item.id === Number(id));
};

export const addCustomer = async (payload) => {
  await delay();

  const newCustomer = {
    ...payload,
    id: Date.now(),
    customerCode: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
    outstanding: 0,
  };

  customers = [newCustomer, ...customers];
  return newCustomer;
};

export const updateCustomer = async (id, payload) => {
  await delay();

  customers = customers.map((item) =>
    item.id === Number(id)
      ? {
          ...item,
          ...payload,
          id: Number(id),
          customerCode: item.customerCode,
          outstanding: item.outstanding,
        }
      : item
  );

  return getCustomerById(id);
};

export const deleteCustomer = async (id) => {
  await delay();

  const customer = customers.find(
    (item) => item.id === Number(id)
  );

  if (customer?.outstanding > 0) {
    throw new Error(
      "Customer has outstanding balance. Settle the balance before deactivating."
    );
  }

  customers = customers.map((item) =>
    item.id === Number(id)
      ? { ...item, status: "INACTIVE" }
      : item
  );

  return true;
};
