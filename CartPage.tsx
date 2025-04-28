
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  RefreshCcw,
  ChevronRight,
  CreditCard,
  ShoppingBag
} from "lucide-react";
import { toast } from "sonner";
import { createOrder } from "@/data/orders";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Calculate cart totals
  const subtotal = totalPrice;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax - discount;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (promoCode.toUpperCase() === "SAVE20") {
        const discountAmount = subtotal * 0.2;
        setDiscount(discountAmount);
        toast.success("Promo code applied successfully!");
      } else {
        toast.error("Invalid promo code");
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to checkout");
      navigate("/login");
      return;
    }
    
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // In a real app, this would redirect to a checkout page
    // For this demo, we'll create an order and clear the cart
    
    if (user) {
      // Create a mock order
      const order = createOrder(
        user.id,
        items,
        {
          name: user.name,
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "USA"
        },
        {
          type: "credit_card",
          lastFour: "4242"
        }
      );
      
      clearCart();
      
      // Navigate to order confirmation
      navigate(`/order-confirmation/${order.id}`);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-3 h-8 w-8" />
          Your Shopping Cart {totalItems > 0 && `(${totalItems} item${totalItems === 1 ? "" : "s"})`}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
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
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-6 font-medium text-gray-700">Product</div>
                  <div className="col-span-2 font-medium text-gray-700 text-center">Price</div>
                  <div className="col-span-2 font-medium text-gray-700 text-center">Quantity</div>
                  <div className="col-span-2 font-medium text-gray-700 text-center">Total</div>
                </div>

                {items.map(({ product, quantity }) => (
                  <div 
                    key={product.id} 
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-6 border-b border-gray-200 last:border-0 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 sm:col-span-6 flex items-center gap-4">
                      <Link to={`/product/${product.id}`} className="flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>
                      <div>
                        <Link 
                          to={`/product/${product.id}`} 
                          className="font-medium text-gray-800 hover:text-shopease-600 line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        <button 
                          onClick={() => handleRemoveItem(product.id)}
                          className="mt-2 text-red-500 hover:text-red-700 text-sm inline-flex items-center sm:hidden"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="sm:hidden text-gray-600">Price:</span>
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="sm:hidden text-gray-600">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => handleQuantityChange(product.id, quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-1 text-center w-8">{quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(product.id, quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 sm:col-span-2 flex items-center justify-between sm:justify-center">
                      <span className="sm:hidden text-gray-600">Total:</span>
                      <span className="font-bold text-shopease-700">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Mobile Remove Button */}
                    <div className="col-span-1 hidden sm:block">
                      <button 
                        onClick={() => handleRemoveItem(product.id)}
                        className="text-gray-500 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="p-6 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center border-shopease-500 text-shopease-600 hover:bg-shopease-50"
                    asChild
                  >
                    <Link to="/products">
                      <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    onClick={() => clearCart()}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Free</span>
                    ) : (
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-shopease-700 text-xl">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo-code" className="block text-sm font-medium mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="promo-code"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button 
                      onClick={handleApplyPromoCode}
                      disabled={isApplyingPromo}
                      className="bg-shopease-500 hover:bg-shopease-600"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Try "SAVE20" for 20% off
                  </p>
                </div>
                
                {/* Checkout Button */}
                <Button 
                  onClick={handleCheckout}
                  className="w-full py-6 bg-shopease-500 hover:bg-shopease-600 text-white text-lg font-semibold"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>
                
                {/* Additional Info */}
                <div className="mt-6 text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>Free shipping</strong> on orders over $100
                  </p>
                  <p>
                    For questions about our checkout process, please contact our customer support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
