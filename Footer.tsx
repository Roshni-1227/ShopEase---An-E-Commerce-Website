
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopEase</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for high-quality products with easy shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-shopease-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-shopease-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-shopease-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@shopease.com" className="text-gray-500 hover:text-shopease-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/electronics" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/categories/fashion" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-shopease-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-shopease-400"
              />
              <button 
                type="submit" 
                className="bg-shopease-500 hover:bg-shopease-600 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
              alt="Visa" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
              alt="MasterCard" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
              alt="PayPal" 
              className="h-8 w-auto"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/349/349230.png" 
              alt="Apple Pay" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
