
import { CartItem } from "@/contexts/CartContext";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: "credit_card" | "paypal" | "bank_transfer";
    lastFour?: string;
  };
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ord-001",
    userId: "1", // Regular user
    items: [
      {
        product: {
          id: "1",
          name: "Premium Wireless Headphones",
          price: 199.99,
          description: "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal clear sound quality.",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
          category: "electronics"
        },
        quantity: 1
      },
      {
        product: {
          id: "5",
          name: "Running Shoes",
          price: 129.99,
          description: "Lightweight, breathable running shoes with responsive cushioning for maximum comfort and performance.",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500",
          category: "fashion"
        },
        quantity: 1
      }
    ],
    totalAmount: 329.98,
    status: "delivered",
    date: "2023-12-12T10:30:00Z",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "4242"
    }
  },
  {
    id: "ord-002",
    userId: "1", // Regular user
    items: [
      {
        product: {
          id: "3",
          name: "Professional Camera",
          price: 1299.99,
          description: "Professional-grade camera with 4K video recording, 30x optical zoom, and advanced image stabilization.",
          image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500",
          category: "electronics"
        },
        quantity: 1
      }
    ],
    totalAmount: 1299.99,
    status: "shipped",
    date: "2024-01-05T14:20:00Z",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    paymentMethod: {
      type: "paypal"
    }
  },
  {
    id: "ord-003",
    userId: "1", // Regular user
    items: [
      {
        product: {
          id: "7",
          name: "Leather Wallet",
          price: 49.99,
          description: "Genuine leather wallet with RFID protection, multiple card slots, and sleek minimalist design.",
          image: "https://images.unsplash.com/photo-1601592996763-f05c9ce5add6?q=80&w=500",
          category: "fashion"
        },
        quantity: 1
      },
      {
        product: {
          id: "11",
          name: "Designer Sunglasses",
          price: 159.99,
          description: "Polarized designer sunglasses with UV protection, durable frame, and premium case included.",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500",
          category: "fashion"
        },
        quantity: 1
      }
    ],
    totalAmount: 209.98,
    status: "processing",
    date: "2024-03-18T09:45:00Z",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "1234"
    }
  }
];

// Get orders for a specific user
export const getUserOrders = (userId: string) => {
  return mockOrders.filter(order => order.userId === userId);
};

// Get a specific order by ID
export const getOrderById = (orderId: string) => {
  return mockOrders.find(order => order.id === orderId);
};

// Mock function to create a new order
export const createOrder = (userId: string, items: CartItem[], shippingAddress: Order["shippingAddress"], paymentMethod: Order["paymentMethod"]): Order => {
  // Calculate total
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Create new order
  const newOrder: Order = {
    id: `ord-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    userId,
    items,
    totalAmount,
    status: "pending",
    date: new Date().toISOString(),
    shippingAddress,
    paymentMethod
  };
  
  // In a real app, we'd save this to a database
  mockOrders.push(newOrder);
  
  return newOrder;
};
