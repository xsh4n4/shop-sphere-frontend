import React from 'react';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';

const Wishlist = ({ setCurrentView, onViewDetails }) => {
  const { state, dispatch } = useApp();

  const moveToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('home')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
        </div>

        <Card className="text-center py-16">
          <CardContent>
            <Heart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save your favorite products to your wishlist and shop them later.</p>
            <Button
              onClick={() => setCurrentView('home')}
              className="bg-slate-500 hover:bg-slate-600 text-white"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('home')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold">My Wishlist ({state.wishlist.length} items)</h1>
        </div>
        
        <Button
          onClick={() => {
            state.wishlist.forEach(product => {
              dispatch({ type: 'ADD_TO_CART', payload: product });
            });
            dispatch({ type: 'CLEAR_WISHLIST' });
            setCurrentView('cart');
          }}
          className="bg-slate-500 hover:bg-slate-600 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Move All to Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {state.wishlist.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard 
              product={product} 
              onViewDetails={onViewDetails}
            />
            
            {/* Additional wishlist actions */}
            <div className="mt-2 flex space-x-2">
              <Button
                onClick={() => moveToCart(product)}
                className="flex-1 bg-slate-500 hover:bg-slate-600 text-white text-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Move to Cart
              </Button>
              
              <Button
                onClick={() => removeFromWishlist(product.id)}
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                <Heart className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist tips */}
      <Card className="mt-8 bg-pink-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2">💡 Wishlist Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Save products you love for later purchase</li>
            <li>• Get notified when wishlist items go on sale</li>
            <li>• Share your wishlist with friends and family</li>
            <li>• Move items to cart when you're ready to buy</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wishlist;

