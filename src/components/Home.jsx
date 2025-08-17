

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '../context/AppContext';
import { productsData, categories } from '../data/products';
import ProductCard from './ProductCard';

const Home = ({ onViewDetails }) => {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productsData;

    // Filter by search query
    if (state.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (state.selectedCategory && state.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === state.selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'newest':
        return [...filtered].sort((a, b) => b.id - a.id);
      case 'bestseller':
        return [...filtered].sort((a, b) => b.bestseller - a.bestseller);
      default:
        return filtered;
    }
  }, [state.searchQuery, state.selectedCategory, sortBy]);

  const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Shop Smart
              <span className="block text-blue-300">Live Better</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover premium products from top brands. Get up to 50% off on selected items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-slate-700 hover:bg-gray-100 text-lg px-8 py-3"
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-slate-500 hover:bg-white hover:text-slate-700 text-lg px-8 py-3"
              >
                Explore Brands
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="w-80 h-80 bg-white/20 rounded-full absolute -top-10 -right-10 animate-pulse"></div>
              <div className="w-60 h-60 bg-white/10 rounded-full absolute top-20 right-20 animate-pulse delay-1000"></div>
              <div className="text-8xl text-center">🛍️✨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CategorySection = () => (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => state.dispatch({ type: 'SET_CATEGORY', payload: category.id })}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold">{category.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const FeaturedSection = () => {
    const featuredProducts = productsData.filter(product => product.bestseller).slice(0, 4);
    
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Bestsellers</h2>
            <p className="text-gray-600">Most loved products by our customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const OffersSection = () => (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-slate-500 to-slate-600 text-white">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
            <p className="mb-4">On orders above ₹299</p>
            <Badge className="bg-white text-slate-600">No Code Required</Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2">Flash Sale</h3>
            <p className="mb-4">Up to 70% off on selected items</p>
            <Badge className="bg-white text-purple-500">Limited Time</Badge>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2">New User Offer</h3>
            <p className="mb-4">Extra 20% off on first order</p>
            <Badge className="bg-white text-green-500">WELCOME20</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Categories */}
      <CategorySection />
      
      {/* Featured Products */}
      <FeaturedSection />
      
      {/* Offers */}
      <OffersSection />
      
      {/* All Products Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              {state.selectedCategory && state.selectedCategory !== 'all' 
                ? `${categories.find(cat => cat.id === state.selectedCategory)?.name || 'Products'}`
                : 'All Products'
              }
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredAndSortedProducts.length} products found
              {/* {state.searchQuery && ` for "${state.searchQuery}"`} */}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="bestseller">Bestsellers</SelectItem>
              </SelectContent>
            </Select>
            
            {/* View mode toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Filters toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="hidden md:flex"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Under ₹500
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      ₹500 - ₹1000
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Above ₹1000
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Brand</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Nykaa
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Lakme
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Maybelline
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      4+ Stars
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      3+ Stars
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      In Stock
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  state.dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  state.dispatch({ type: 'SET_CATEGORY', payload: 'all' });
                }}
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;