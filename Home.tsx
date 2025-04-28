
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import ProductCard from "@/components/Products/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, TrendingUp, Award, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // Get random products from each category
      const electronics = products.filter(p => p.category === "electronics").slice(0, 4);
      const fashion = products.filter(p => p.category === "fashion").slice(0, 4);
      
      setFeaturedProducts([...electronics, ...fashion]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-shopease-900 to-shopease-700 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Shop with Ease, Live with Style</h1>
            <p className="text-lg mb-8 text-gray-100">
              Discover premium products with fast shipping and hassle-free returns. Your satisfaction is our priority.
            </p>
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="bg-white text-shopease-800 hover:bg-gray-100"
                asChild
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/10 rounded-lg h-48 animate-pulse"></div>
                ))
              ) : (
                featuredProducts.slice(0, 4).map(product => (
                  <div 
                    key={product.id} 
                    className="relative bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <p className="text-white p-2 font-medium text-sm truncate w-full">
                          {product.name}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Shop with Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a seamless shopping experience with premium products and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-shopease-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-shopease-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Premium Products</h3>
              <p className="text-gray-600">
                Curated selection of high-quality products from trusted brands.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-shopease-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-shopease-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your doorstep, with real-time tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-shopease-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-shopease-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Dedicated support team and hassle-free returns to ensure your satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
            <Button variant="ghost" className="text-shopease-600 hover:text-shopease-700" asChild>
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                        <div className="flex justify-between mt-4">
                          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  featuredProducts.slice(0, 8).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="electronics">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                        <div className="flex justify-between mt-4">
                          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  featuredProducts
                    .filter(p => p.category === "electronics")
                    .slice(0, 4)
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="fashion">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                        <div className="flex justify-between mt-4">
                          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  featuredProducts
                    .filter(p => p.category === "fashion")
                    .slice(0, 4)
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-shopease-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Upgrade Your Shopping Experience?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover why ShopEase is the preferred choice for online shopping.
          </p>
          {isAuthenticated ? (
            <Button 
              size="lg" 
              className="bg-shopease-500 hover:bg-shopease-600"
              asChild
            >
              <Link to="/products">Continue Shopping</Link>
            </Button>
          ) : (
            <div className="space-x-4">
              <Button 
                size="lg" 
                className="bg-shopease-500 hover:bg-shopease-600"
                asChild
              >
                <Link to="/signup">Create Account</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-shopease-500 text-shopease-600 hover:bg-shopease-50"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
