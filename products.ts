
import { Product } from "@/contexts/CartContext";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal clear sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
    category: "electronics"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 299.99,
    description: "Latest generation smartwatch with heart rate monitoring, sleep tracking, and a beautiful OLED display.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500",
    category: "electronics"
  },
  {
    id: "3",
    name: "Professional Camera",
    price: 1299.99,
    description: "Professional-grade camera with 4K video recording, 30x optical zoom, and advanced image stabilization.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=500",
    category: "electronics"
  },
  {
    id: "4",
    name: "Designer Backpack",
    price: 89.99,
    description: "Stylish, water-resistant backpack with multiple compartments and laptop sleeve. Perfect for work or travel.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?q=80&w=500",
    category: "fashion"
  },
  {
    id: "5",
    name: "Running Shoes",
    price: 129.99,
    description: "Lightweight, breathable running shoes with responsive cushioning for maximum comfort and performance.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500",
    category: "fashion"
  },
  {
    id: "6",
    name: "Smart Home Speaker",
    price: 149.99,
    description: "Smart speaker with voice assistant, premium sound quality, and home automation capabilities.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=500",
    category: "electronics"
  },
  {
    id: "7",
    name: "Leather Wallet",
    price: 49.99,
    description: "Genuine leather wallet with RFID protection, multiple card slots, and sleek minimalist design.",
    image: "https://images.unsplash.com/photo-1601592996763-f05c9ce5add6?q=80&w=500",
    category: "fashion"
  },
  {
    id: "8",
    name: "Stainless Steel Watch",
    price: 179.99,
    description: "Classic stainless steel watch with sapphire crystal, Japanese movement, and 100m water resistance.",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=500",
    category: "fashion"
  },
  {
    id: "9",
    name: "Wireless Earbuds",
    price: 129.99,
    description: "Truly wireless earbuds with active noise cancellation, transparency mode, and 24-hour battery life.",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=500",
    category: "electronics"
  },
  {
    id: "10",
    name: "Portable Power Bank",
    price: 59.99,
    description: "20,000mAh power bank with fast charging, dual USB ports, and compact design for on-the-go charging.",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=500",
    category: "electronics"
  },
  {
    id: "11",
    name: "Designer Sunglasses",
    price: 159.99,
    description: "Polarized designer sunglasses with UV protection, durable frame, and premium case included.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500",
    category: "fashion"
  },
  {
    id: "12",
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Waterproof Bluetooth speaker with 360° sound, 12-hour battery life, and rugged design for outdoor use.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=500",
    category: "electronics"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map(product => product.category)));
};

export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery)
  );
};
