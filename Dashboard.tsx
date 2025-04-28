
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/data/products";
import { mockOrders } from "@/data/orders";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  BarChart3,
  Search,
  ShoppingCart,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";

// Simple Dashboard component for admins
const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect non-admin users
  useEffect(() => {
    if (isAuthenticated && user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">Please log in to access the admin dashboard.</p>
          <Button 
            asChild
            className="bg-shopease-500 hover:bg-shopease-600"
          >
            <a href="/login">Login</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (user?.role !== "admin") {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">
            You don't have permission to access the admin dashboard.
          </p>
          <Button 
            asChild
            className="bg-shopease-500 hover:bg-shopease-600"
          >
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Filter products based on search query
  const filteredProducts = products.filter(
    product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your store, products, and orders</p>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Products</p>
                  <h3 className="text-2xl font-bold mt-1">{products.length}</h3>
                </div>
                <div className="bg-shopease-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-shopease-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{mockOrders.length}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">
                    ${mockOrders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}
                  </h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">2</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products">
          <TabsList className="mb-8">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Manage Products</CardTitle>
                    <CardDescription>
                      View, edit, or delete your products. Add new products to your store.
                    </CardDescription>
                  </div>
                  <Button className="bg-shopease-500 hover:bg-shopease-600">
                    Add New Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      className="pl-10"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 pl-4 font-semibold text-gray-600">Product</th>
                        <th className="pb-3 font-semibold text-gray-600">Category</th>
                        <th className="pb-3 font-semibold text-gray-600">Price</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-4 pl-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                              </div>
                            </td>
                            <td className="py-4">
                              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4">
                              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4 pr-4">
                              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        filteredProducts.map(product => (
                          <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 pl-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <span className="font-medium line-clamp-1">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-4 capitalize">{product.category}</td>
                            <td className="py-4">${product.price.toFixed(2)}</td>
                            <td className="py-4 pr-4 space-x-2">
                              <Button variant="outline" size="sm" className="inline-flex items-center">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="inline-flex items-center text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  View and manage customer orders. Update order status and track deliveries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 pl-4 font-semibold text-gray-600">Order ID</th>
                        <th className="pb-3 font-semibold text-gray-600">Customer</th>
                        <th className="pb-3 font-semibold text-gray-600">Date</th>
                        <th className="pb-3 font-semibold text-gray-600">Total</th>
                        <th className="pb-3 font-semibold text-gray-600">Status</th>
                        <th className="pb-3 pr-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="py-4 pl-4">
                              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4">
                              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4">
                              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4">
                              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4">
                              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                            <td className="py-4 pr-4">
                              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        mockOrders.map(order => (
                          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 pl-4 font-medium">{order.id}</td>
                            <td className="py-4">{order.shippingAddress.name}</td>
                            <td className="py-4">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-4">${order.totalAmount.toFixed(2)}</td>
                            <td className="py-4">
                              <span className={`
                                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}
                              `}>
                                <span className="capitalize">{order.status}</span>
                              </span>
                            </td>
                            <td className="py-4 pr-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>
                  Track your store's performance and sales trends.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-72 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">Analytics Dashboard</h3>
                    <p className="text-gray-500 max-w-md mt-2">
                      Detailed analytics would be displayed here in a real application, showing sales trends, revenue, and customer behavior.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
