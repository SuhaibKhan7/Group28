const Users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const Products = [
  {
    id: 101,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    sellerId: 1,
    weight: 2.5,
    dimensions: "15x10 inches",
    shippingCost: 25,
    __typename: "PhysicalProduct",
  },
  {
    id: 102,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    sellerId: 2,
    weight: 0.4,
    dimensions: "6x3 inches",
    shippingCost: 10,
    __typename: "PhysicalProduct",
  },
  {
    id: 103,
    name: "E-Book: JavaScript Guide",
    price: 15,
    category: "Books",
    sellerId: 1,
    fileSize: 2.5,
    format: "PDF",
    downloadLink: "https://example.com/download/ebook1",
    __typename: "DigitalProduct",
  },
  {
    id: 104,
    name: "Tshirt",
    price: 50,
    category: "Clothes",
    sellerId: 2,
    size: "M",
    __typename: "Clothes",
    length: 1000,
  },
];

export default { Users, Products };
