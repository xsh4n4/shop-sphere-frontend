
import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '../context/AppContext';

const Header = ({ currentView, setCurrentView }) => {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    
    // Optionally: trigger search immediately or after debounce
    if (query.trim() === '') {
      setCurrentView('home'); // or whatever your default view is
    } else {
      setCurrentView('search'); // make sure you have a search results view
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setCurrentView('search');
    }
  };

  const handleAuthClick = () => {
    if (state.user) {
      dispatch({ type: 'LOGOUT' });
      setCurrentView('home');
    } else {
      dispatch({ type: 'TOGGLE_AUTH_MODAL' });
    }
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = state.wishlist.length;

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="text-2xl font-bold cursor-pointer flex items-center"
            onClick={() => {
              setCurrentView('home');
              dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
              setLocalSearchQuery('');
            }}
          >
            <span className="text-3xl mr-2">🛍️</span>
            ShopSphere
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for products, brands..."
                value={localSearchQuery}
                onChange={handleSearch}
                className="pl-10 bg-white text-black border-0 focus:ring-2 focus:ring-slate-300"
              />
            </form>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAuthClick}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <User className="w-4 h-4 mr-2" />
                {state.user ? state.user.name : 'Sign In'}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('wishlist')}
                className="text-white hover:bg-white/20 hover:text-white relative"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('cart')}
                className="text-white hover:bg-white/20 hover:text-white relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              {state.user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('orders')}
                  className="text-white hover:bg-white/20"
                >
                  Orders
                </Button>
              )}
            </div>
        </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for products, brands..."
              value={localSearchQuery}
              onChange={handleSearch}
              className="pl-10 bg-white text-black border-0 focus:ring-2 focus:ring-slate-300"
            />
          </form>
        </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg mb-4 p-4">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                onClick={handleAuthClick}
                className="text-white hover:bg-white/20 justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                {state.user ? state.user.name : 'Sign In'}
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentView('wishlist');
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:bg-white/20 justify-start"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist ({wishlistCount})
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentView('cart');
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:bg-white/20 justify-start"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartItemsCount})
              </Button>

              {state.user && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentView('orders');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/20 justify-start"
                >
                  Orders
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-8.5 pb-4">
  <button 
    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'makeup' })}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 hover:text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    <span>💄</span>
    <span>Makeup</span>
  </button>
  <button 
    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'skincare' })}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 hover:text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    <span>🧴</span>
    <span>Skincare</span>
  </button>
  <button 
    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'haircare' })}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 hover:text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    <span>💇‍♀️</span>
    <span>Haircare</span>
  </button>
  <button 
    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'fragrance' })}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 hover:text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    <span>🌸</span>
    <span>Fragrance</span>
  </button>
  <button 
    onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'tools' })}
    className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 hover:text-white transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
  >
    <span>🖌️</span>
    <span>Tools & Brushes</span>
  </button>
</div>
      </div>
    </header>
  );
};

export default Header;