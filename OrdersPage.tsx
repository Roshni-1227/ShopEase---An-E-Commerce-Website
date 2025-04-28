
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getUserOrders } from "@/data/orders";
import { Order } from "@/data/orders";
import { ShoppingBag, ChevronRight, ExternalLink } from "lucide-react";

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (user) {
        const userOrders = getUserOrders(user.id);
        setOrders(userOrders);
      }
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your orders.</p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Your Orders</h1>
        <p className="text-gray-600 mb-8">View and track your orders</p>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
                <div className="h-16 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button 
                size="lg" 
                className="bg-shopease-500 hover:bg-shopease-600"
                asChild
              >
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div 
                key={order.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">Order #{order.id}</h2>
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      <span className="capitalize">{order.status}</span>
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-shopease-500 text-shopease-600"
                      asChild
                    >
                      <Link to={`/order-confirmation/${order.id}`}>
                        View Details
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map(({ product, quantity }) => (
                      <div 
                        key={product.id} 
                        className="flex gap-4"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <Link 
                            to={`/product/${product.id}`} 
                            className="font-medium text-gray-800 hover:text-shopease-600"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500">Qty: {quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between pt-4 border-t border-gray-200">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-shopease-700">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
