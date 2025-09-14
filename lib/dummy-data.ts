export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: number
  name: string
  email: string
  role: "customer" | "admin"
  avatar?: string
}

export interface Order {
  id: string
  userId: number
  items: CartItem[]
  total: number
  status: "placed" | "packed" | "shipped" | "delivered"
  date: string
  shippingAddress: {
    name: string
    address: string
    city: string
    zipCode: string
  }
}

export const dummyProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: "electronics",
    image: "/wireless-bluetooth-headphones.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "Comfortable and sustainable organic cotton t-shirt in various colors.",
    category: "clothing",
    image: "/organic-cotton-tshirt.png",
    rating: { rate: 4.2, count: 89 },
  },
  {
    id: 3,
    title: "Smart Fitness Watch",
    price: 199.99,
    description: "Advanced fitness tracking with heart rate monitor and GPS.",
    category: "electronics",
    image: "/smart-fitness-watch.png",
    rating: { rate: 4.7, count: 203 },
  },
  {
    id: 4,
    title: "Ceramic Coffee Mug Set",
    price: 34.99,
    description: "Set of 4 handcrafted ceramic mugs perfect for your morning coffee.",
    category: "home",
    image: "/ceramic-coffee-mug-set.png",
    rating: { rate: 4.3, count: 67 },
  },
  {
    id: 5,
    title: "Leather Crossbody Bag",
    price: 89.99,
    description: "Stylish genuine leather crossbody bag with multiple compartments.",
    category: "accessories",
    image: "/leather-crossbody-bag.png",
    rating: { rate: 4.6, count: 145 },
  },
  {
    id: 6,
    title: "Yoga Mat Premium",
    price: 49.99,
    description: "Non-slip premium yoga mat with carrying strap and alignment lines.",
    category: "sports",
    image: "/premium-yoga-mat.png",
    rating: { rate: 4.4, count: 98 },
  },
]

export const dummyUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "customer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "customer" },
  { id: 3, name: "Admin User", email: "admin@ezshopnship.com", role: "admin" },
]

export const dummyOrders: Order[] = [
  {
    id: "ORD-001",
    userId: 1,
    items: [
      { ...dummyProducts[0], quantity: 1 },
      { ...dummyProducts[1], quantity: 2 },
    ],
    total: 129.97,
    status: "delivered",
    date: "2024-01-15",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      zipCode: "10001",
    },
  },
  {
    id: "ORD-002",
    userId: 2,
    items: [{ ...dummyProducts[2], quantity: 1 }],
    total: 199.99,
    status: "shipped",
    date: "2024-01-20",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 Oak Ave",
      city: "Los Angeles",
      zipCode: "90210",
    },
  },
]

export const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "home", name: "Home & Garden", icon: "🏠" },
  { id: "accessories", name: "Accessories", icon: "👜" },
  { id: "sports", name: "Sports & Fitness", icon: "⚽" },
  { id: "books", name: "Books", icon: "📚" },
]
