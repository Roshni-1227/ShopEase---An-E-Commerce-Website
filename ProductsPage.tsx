import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import ProductGrid from "@/components/Products/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { products, getCategories } from "@/data/products";
import { Product } from "@/contexts/CartContext";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Get all available categories
  useEffect(() => {
    setCategories(getCategories());
  }, []);

  // Initialize category filters from URL
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }
    
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
    
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
    
    const sort = searchParams.get("sort");
    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      let filtered = [...products];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
      }
      
      // Apply category filters
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => 
          selectedCategories.includes(product.category)
        );
      }
      
      // Apply price range filter
      filtered = filtered.filter(
        product => 
          product.price >= priceRange[0] && 
          product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortBy) {
        case "price-low-high":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          // In a real app, would sort by date
          // Here just keep the original order which simulates newest first
          break;
        default:
          // featured - no specific sorting
          break;
      }
      
      setFilteredProducts(filtered);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  // Update URL with filters
  const updateFilters = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }
    
    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());
    
    if (sortBy !== "featured") {
      params.set("sort", sortBy);
    }
    
    setSearchParams(params);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters();
  };

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 1500]);
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile Filter Toggle */}
          <div className="w-full md:hidden mb-4">
            <Button 
              onClick={() => setFiltersVisible(!filtersVisible)}
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {filtersVisible ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Sidebar - Desktop always visible, mobile toggleable */}
          <aside className={`w-full md:w-64 md:block ${filtersVisible ? 'block' : 'hidden'}`}>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-red-500 p-0 h-auto"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm capitalize cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1500}
                  step={10}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}+</span>
                </div>
              </div>

              {/* Apply Filters Button */}
              <Button 
                onClick={updateFilters}
                className="w-full bg-shopease-500 hover:bg-shopease-600"
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-52">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {loading ? 'Products' : `${filteredProducts.length} Products`}
              </h1>
              
              {/* Selected Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="bg-shopease-100 text-shopease-700 text-sm rounded-full px-3 py-1 flex items-center">
                    Search: {searchQuery}
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        updateFilters();
                      }}
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {selectedCategories.map(category => (
                  <div 
                    key={category}
                    className="bg-shopease-100 text-shopease-700 text-sm rounded-full px-3 py-1 flex items-center capitalize"
                  >
                    {category}
                    <button 
                      onClick={() => {
                        toggleCategory(category);
                        updateFilters();
                      }}
                      className="ml-2"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
