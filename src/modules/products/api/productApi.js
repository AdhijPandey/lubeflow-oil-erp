
const initialProducts = [
  {
    id: 1,
    sku: "ENG-001",
    name: "Castrol Power1 Ultimate",
    brand: "Castrol",
    category: "Bike Engine Oil",
    viscosity: "10W-40",
    unit: "1 Litre Bottle",
    purchasePrice: 420,
    retailPrice: 550,
    wholesalePrice: 510,
    stock: 45,
    minStock: 10,
    gst: 18,
    status: "ACTIVE",
  },
  {
    id: 2,
    sku: "ENG-002",
    name: "Mobil Super 1000",
    brand: "Mobil",
    category: "Car Engine Oil",
    viscosity: "15W-40",
    unit: "5 Litre Can",
    purchasePrice: 1250,
    retailPrice: 1550,
    wholesalePrice: 1450,
    stock: 8,
    minStock: 15,
    gst: 18,
    status: "ACTIVE",
  },
  {
    id: 3,
    sku: "GEAR-001",
    name: "Shell Spirax Gear Oil",
    brand: "Shell",
    category: "Gear Oil",
    viscosity: "80W-90",
    unit: "1 Litre Bottle",
    purchasePrice: 310,
    retailPrice: 420,
    wholesalePrice: 390,
    stock: 0,
    minStock: 10,
    gst: 18,
    status: "INACTIVE",
  },
  {
    id: 4,
    sku: "TRC-001",
    name: "HP Milcy Turbo",
    brand: "HP",
    category: "Tractor Engine Oil",
    viscosity: "15W-40",
    unit: "15 Litre Tin",
    purchasePrice: 2100,
    retailPrice: 2600,
    wholesalePrice: 2450,
    stock: 25,
    minStock: 8,
    gst: 18,
    status: "ACTIVE",
  },
  {
    id: 5,
    sku: "DRM-001",
    name: "Servo Engine Oil",
    brand: "Servo",
    category: "Industrial Oil",
    viscosity: "20W-40",
    unit: "200 Litre Drum",
    purchasePrice: 28000,
    retailPrice: 32000,
    wholesalePrice: 30500,
    stock: 5,
    minStock: 3,
    gst: 18,
    status: "ACTIVE",
  },
];

let products = [...initialProducts];

const delay = (ms = 200) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay();
  return [...products];
};

export const getProductById = async (id) => {
  await delay();
  return products.find((item) => item.id === Number(id));
};

export const createProduct = async (payload) => {
  await delay();

  const newProduct = {
    ...payload,
    id: Date.now(),
  };

  products = [newProduct, ...products];

  return newProduct;
};

export const updateProduct = async (id, payload) => {
  await delay();

  products = products.map((item) =>
    item.id === Number(id)
      ? { ...item, ...payload, id: Number(id) }
      : item
  );

  return getProductById(id);
};

export const deleteProduct = async (id) => {
  await delay();

  products = products.filter(
    (item) => item.id !== Number(id)
  );

  return true;
};
