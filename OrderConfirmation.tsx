
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  Truck,
  Calendar,
  MapPin,
  CreditCard
} from "lucide-react";
import { getOrderById } from "@/data/orders";
import { Order } from "@/data/orders";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (orderId) {
        const foundOrder = getOrderById(orderId);
        setOrder(foundOrder || null);
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [orderId]);

  // Calculate expected delivery date (5 days from order date)
  const getExpectedDeliveryDate = (orderDate: string) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
              <div className="h-64 bg-gray-300 rounded w-full"></div>
              <div className="h-20 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-10">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 text-lg">
            Your order has been placed successfully. We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Order #{order.id}</h2>
                <p className="text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="flex items-center px-3 py-1 bg-shopease-100 text-shopease-700 rounded-full text-sm font-medium">
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold mb-4">Order Details</h3>
            
            {/* Order Items */}
            <div className="mb-8">
              {order.items.map(({ product, quantity }) => (
                <div 
                  key={product.id} 
                  className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-200 last:border-0"
                >
                  <div className="sm:w-16">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <Link 
                          to={`/product/${product.id}`} 
                          className="font-medium text-gray-800 hover:text-shopease-600"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                      </div>
                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <span className="text-sm text-gray-600">
                          ${product.price.toFixed(2)} x {quantity}
                        </span>
                        <p className="font-medium">
                          ${(product.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-md mb-8">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.totalAmount > 100 ? 'Free' : '$9.99'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(order.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-shopease-700">
                    ${(order.totalAmount + (order.totalAmount > 100 ? 0 : 9.99) + (order.totalAmount * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-gray-500" />
                  Shipping Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <p className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">
                        <span className="font-medium">Expected Delivery:</span> {getExpectedDeliveryDate(order.date)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                  Payment Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p className="capitalize font-medium">
                    {order.paymentMethod.type.replace('_', ' ')}
                  </p>
                  {order.paymentMethod.lastFour && (
                    <p>
                      Card ending in {order.paymentMethod.lastFour}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Billing Address:</span> Same as shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="border-shopease-500 text-shopease-600 hover:bg-shopease-50"
            asChild
          >
            <Link to="/orders">
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              View All Orders
            </Link>
          </Button>
          
          <Button 
            className="bg-shopease-500 hover:bg-shopease-600"
            asChild
          >
            <Link to="/products">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmation;
