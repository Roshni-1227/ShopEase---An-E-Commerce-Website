
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Heart,
  Check,
  Star,
  Minus,
  Plus,
  Share2,
  Truck,
  RefreshCw,
  ShieldCheck
} from "lucide-react";
import { Product } from "@/contexts/CartContext";
import { getProductById, products } from "@/data/products";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Reset state when product ID changes
    setLoading(true);
    setQuantity(1);
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      if (id) {
        const foundProduct = getProductById(id);
        setProduct(foundProduct || null);
        
        // Get related products (same category)
        if (foundProduct) {
          const related = products
            .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 animate-pulse">
              <div className="bg-gray-300 rounded-lg h-96"></div>
            </div>
            <div className="md:w-1/2 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
              <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-shopease-600">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-shopease-600">Products</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link 
                to={`/categories/${product.category}`} 
                className="text-gray-500 hover:text-shopease-600 capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">4.0 (24 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-shopease-700">${product.price.toFixed(2)}</span>
              {product.price > 100 && (
                <span className="ml-3 text-sm text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-8">{product.description}</p>
            
            {/* Product Availability */}
            <div className="flex items-center text-green-600 mb-6">
              <Check className="h-5 w-5 mr-2" />
              <span>In Stock and Ready to Ship</span>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-center w-12">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-shopease-500 hover:bg-shopease-600 text-white h-12"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 border-shopease-500 text-shopease-600 hover:bg-shopease-50 h-12"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Free Shipping</h3>
                  <p className="text-sm text-gray-600">Orders over $50 qualify for free shipping.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RefreshCw className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Easy Returns</h3>
                  <p className="text-sm text-gray-600">Return within 30 days for a full refund.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Your payment information is processed securely.</p>
                </div>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center mt-6">
              <span className="text-gray-600 mr-3">Share:</span>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Brand:</span>
                  <span className="float-right font-medium">ShopEase</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Model:</span>
                  <span className="float-right font-medium">SE-{product.id}</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="float-right font-medium capitalize">{product.category}</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Warranty:</span>
                  <span className="float-right font-medium">1 Year</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Weight:</span>
                  <span className="float-right font-medium">0.5 kg</span>
                </div>
                <div className="border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="float-right font-medium">10 x 5 x 3 cm</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">Based on 24 reviews</span>
                </div>
                
                <Button className="bg-shopease-500 hover:bg-shopease-600">
                  Write a Review
                </Button>
              </div>
              
              {/* Sample reviews */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">Amazing product!</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By John D. on March 15, 2024
                  </p>
                  <p className="text-gray-600">
                    I'm extremely happy with this purchase. The quality is excellent and it works perfectly. Highly recommended!
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium">Great value for money</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By Sarah M. on February 28, 2024
                  </p>
                  <p className="text-gray-600">
                    The product exceeded my expectations given the price point. It has all the features I need and the build quality is solid.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <div key={related.id} className="group">
                  <Link to={`/product/${related.id}`} className="block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={related.image} 
                        alt={related.name} 
                        className="w-full h-48 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-800 group-hover:text-shopease-600 transition-colors mb-1 truncate">
                          {related.name}
                        </h3>
                        <span className="text-shopease-700 font-bold">${related.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
