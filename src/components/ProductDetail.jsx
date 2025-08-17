import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Minus, Plus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';

const ProductDetail = ({ product, onClose }) => {
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');

  if (!product) return null;

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleBuyNow = () => {
    if (!state.user) {
      dispatch({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }
    
    const orderItems = [{ ...product, quantity }];
    const total = product.price * quantity;
    
    dispatch({ 
      type: 'ADD_ORDER', 
      payload: { items: orderItems, total } 
    });
    
    alert(`Order placed successfully for ${quantity} x ${product.name}!`);
    onClose();
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/ff69b4/ffffff?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                
                {product.bestseller && (
                  <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                    Bestseller
                  </Badge>
                )}
                
                {discountPercentage > 0 && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Additional product images would go here */}
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">Image {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <p className="text-slate-600 font-medium text-lg">{product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
                <Button variant="link" className="text-slate-600 p-0">
                  Write a review
                </Button>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-slate-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <Badge className="bg-green-100 text-green-800">
                    Save {discountPercentage}%
                  </Badge>
                )}
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Available Colors:</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-full border text-sm ${
                          selectedColor === color
                            ? 'border-slate-500 bg-slate-50 text-slate-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-2">Quantity:</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 ${
                      isInCart 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-slate-500 hover:bg-slate-600'
                    } text-white`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    onClick={handleToggleWishlist}
                    variant="outline"
                    className={`${
                      isInWishlist 
                        ? 'border-red-500 text-red-500 hover:bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <Button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  variant="outline"
                  className="w-full border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white"
                >
                  Buy Now
                </Button>

                <Button variant="ghost" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share this product
                </Button>
              </div>

              {!product.inStock && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-medium">Out of Stock</p>
                  <p className="text-red-600 text-sm">This product is currently unavailable.</p>
                </div>
              )}

              {/* Product Features */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Product Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High-quality ingredients</li>
                  <li>• Dermatologically tested</li>
                  <li>• Cruelty-free</li>
                  <li>• Long-lasting formula</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;

