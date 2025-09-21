// export interface Product {
//   id: number
//   title: string
//   price: number
//   description: string
//   category: string
//   image: string
//   rating: {
//     rate: number
//     count: number
//   }
// }

// export interface CartItem extends Product {
//   quantity: number
// }

// export interface User {
//   id: number
//   name: string
//   email: string
//   role: "customer" | "admin"
//   avatar?: string
// }

// export interface Order {
//   id: string
//   userId: number
//   items: CartItem[]
//   total: number
//   status: "placed" | "packed" | "shipped" | "delivered"
//   date: string
//   shippingAddress: {
//     name: string
//     address: string
//     city: string
//     zipCode: string
//   }
// }

// export const dummyProducts: Product[] = [
//   {
//     id: 1,
//     title: "Wireless Bluetooth Headphones",
//     price: 79.99,
//     description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
//     category: "electronics",
//     image: "/wireless-bluetooth-headphones.jpg",
//     rating: { rate: 4.5, count: 120 },
//   },
//   {
//     id: 2,
//     title: "Organic Cotton T-Shirt",
//     price: 24.99,
//     description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
//     category: "clothing",
//     image: "/organic-cotton-tshirt.png",
//     rating: { rate: 4.2, count: 89 },
//   },
//   {
//     id: 3,
//     title: "Smart Fitness Watch",
//     price: 199.99,
//     description: "Advanced fitness tracking with heart rate monitor and GPS.",
//     category: "electronics",
//     image: "/smart-fitness-watch.png",
//     rating: { rate: 4.7, count: 203 },
//   },
//   {
//     id: 4,
//     title: "Ceramic Coffee Mug Set",
//     price: 34.99,
//     description: "Set of 4 handcrafted ceramic mugs perfect for your morning coffee.",
//     category: "home",
//     image: "/ceramic-coffee-mug-set.png",
//     rating: { rate: 4.3, count: 67 },
//   },
//   {
//     id: 5,
//     title: "Leather Crossbody Bag",
//     price: 89.99,
//     description: "Stylish genuine leather crossbody bag with multiple compartments.",
//     category: "accessories",
//     image: "/leather-crossbody-bag.png",
//     rating: { rate: 4.6, count: 145 },
//   },
//   {
//     id: 6,
//     title: "Yoga Mat Premium",
//     price: 49.99,
//     description: "Non-slip premium yoga mat with carrying strap and alignment lines.",
//     category: "sports",
//     image: "/premium-yoga-mat.png",
//     rating: { rate: 4.4, count: 98 },
//   },
// ]

// export const dummyUsers: User[] = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "customer" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer" },
//   { id: 3, name: "Admin User", email: "admin@ezshopnship.com", role: "admin" },
// ]

// export const dummyOrders: Order[] = [
//   {
//     id: "ORD-001",
//     userId: 1,
//     items: [
//       { ...dummyProducts[0], quantity: 1 },
//       { ...dummyProducts[1], quantity: 2 },
//     ],
//     total: 129.97,
//     status: "delivered",
//     date: "2024-01-15",
//     shippingAddress: {
//       name: "John Doe",
//       address: "123 Main St",
//       city: "New York",
//       zipCode: "10001",
//     },
//   },
//   {
//     id: "ORD-002",
//     userId: 2,
//     items: [{ ...dummyProducts[2], quantity: 1 }],
//     total: 199.99,
//     status: "shipped",
//     date: "2024-01-20",
//     shippingAddress: {
//       name: "Jane Smith",
//       address: "456 Oak Ave",
//       city: "Los Angeles",
//       zipCode: "90210",
//     },
//   },
// ]

// export const categories = [
//   { id: "electronics", name: "Electronics", icon: "📱" },
//   { id: "clothing", name: "Clothing", icon: "👕" },
//   { id: "home", name: "Home & Garden", icon: "🏠" },
//   { id: "accessories", name: "Accessories", icon: "👜" },
//   { id: "sports", name: "Sports & Fitness", icon: "⚽" },
//   { id: "books", name: "Books", icon: "📚" },
// ]






import {
  Shirt,
  Smartphone,
  Home,
  Briefcase,
  Dumbbell,
  Book,
} from 'lucide-react';

const BASE_URL = 'https://dummyjson.com';

// Custom data interfaces to match the application's needs.
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string;
}

export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  total: number;
  status: "placed" | "packed" | "shipped" | "delivered";
  date: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

export const categories = [
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "clothing", name: "Clothing", icon: Shirt },
  { id: "home", name: "Home & Garden", icon: Home },
  { id: "accessories", name: "Accessories", icon: Briefcase },
  { id: "sports", name: "Sports & Fitness", icon: Dumbbell },
  { id: "books", name: "Books", icon: Book },
];

/**
 * A general-purpose data-fetching function to handle API calls and errors.
 * @param endpoint The API endpoint to fetch data from.
 * @returns The JSON data from the response.
 */
async function fetchData(endpoint: string) {
  try {
    // The API URL is updated to fetch a higher limit of items.
    const response = await fetch(`${BASE_URL}${endpoint}?limit=1000`);
    if (!response.ok) {
      throw new Error(`API call to ${endpoint} failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetches products from the API and maps them to the Product interface.
 * @returns A promise that resolves to an array of products.
 */
export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchData('/products');
  if (!data || !data.products) {
    console.warn("Failed to fetch products. Returning empty array.");
    return [];
  }

  // Map the API response to the Product interface.
  return data.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.images[0] || "https://placehold.co/600x400",
    rating: {
      rate: p.rating,
      count: Math.floor(Math.random() * 200) + 50, // DummyJSON doesn't have a count, so we generate a random one.
    },
  }));
}

/**
 * Fetches users from the API and maps them to the User interface.
 * Also assigns roles based on ID.
 * @returns A promise that resolves to an array of users.
 */
export async function fetchDummyUsers(): Promise<User[]> {
  const data = await fetchData('/users');
  if (!data || !data.users) {
    console.warn("Failed to fetch users. Returning empty array.");
    return [];
  }

  // Map the API response to the User interface.
  return data.users.map((u: any, index: number) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    email: u.email,
    role: u.id === 3 ? "admin" : "customer", // Assign a fixed admin for consistency.
    avatar: u.image || "https://placehold.co/150x150",
  }));
}

/**
 * Creates dummy order data by combining fetched products and users.
 * @param users The array of users.
 * @param products The array of products.
 * @returns A promise that resolves to an array of orders.
 */
export async function createDummyOrders(users: User[], products: Product[]): Promise<Order[]> {
  if (products.length < 3 || users.length < 2) {
    console.warn("Not enough products or users to create dummy orders. Returning empty array.");
    return [];
  }

  // This is a static mock since dummyjson.com does not provide order-specific data.
  const mockOrders: Omit<Order, 'total'>[] = [
    {
      id: "ORD-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
      userId: users[0].id,
      items: [
        { ...products[0], quantity: 1 },
        { ...products[1], quantity: 2 },
      ],
      status: "delivered",
      date: "2024-01-15",
      shippingAddress: {
        name: users[0].name,
        address: "123 Main St",
        city: "New York",
        zipCode: "10001",
      },
    },
    {
      id: "ORD-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
      userId: users[1].id,
      items: [{ ...products[2], quantity: 1 }],
      status: "shipped",
      date: "2024-01-20",
      shippingAddress: {
        name: users[1].name,
        address: "456 Oak Ave",
        city: "Los Angeles",
        zipCode: "90210",
      },
    },
  ];

  return mockOrders.map(order => ({
    ...order,
    // Calculate the total based on the mapped product prices.
    total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  }));
}
