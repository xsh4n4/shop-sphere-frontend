// import React from 'react';
// import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useApp } from '../context/AppContext';

// const ProductCard = ({ product, onViewDetails }) => {
//   const { state, dispatch } = useApp();

//   const isInWishlist = state.wishlist.some(item => item.id === product.id);
//   const isInCart = state.cart.some(item => item.id === product.id);

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     dispatch({ type: 'ADD_TO_CART', payload: product });
//   };

//   const handleToggleWishlist = (e) => {
//     e.stopPropagation();
//     if (isInWishlist) {
//       dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
//     } else {
//       dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
//     }
//   };

//   const handleBuyNow = (e) => {
//     e.stopPropagation();
//     if (!state.user) {
//       dispatch({ type: 'SET_AUTH_MODAL', payload: true });
//       return;
//     }
    
//     const orderItems = [{ ...product, quantity: 1 }];
//     const total = product.price;
    
//     dispatch({ 
//       type: 'ADD_ORDER', 
//       payload: { items: orderItems, total } 
//     });
    
//     // Show success message (you could implement a toast system)
//     alert(`Order placed successfully for ${product.name}!`);
//   };

//   const handleViewDetails = (e) => {
//     e.stopPropagation();
//     onViewDetails(product);
//   };

//   const discountPercentage = product.originalPrice 
//     ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//     : 0;

//   return (
//     <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
//       {product.bestseller && (
//         <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600">
//           Bestseller
//         </Badge>
//       )}
      
//       {discountPercentage > 0 && (
//         <Badge className="absolute top-2 right-2 z-10 bg-green-500 hover:bg-green-600">
//           {discountPercentage}% OFF
//         </Badge>
//       )}

//       <div className="relative overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//           onError={(e) => {
//             e.target.src = `https://via.placeholder.com/400x400/ff69b4/ffffff?text=${encodeURIComponent(product.name)}`;
//           }}
//         />
        
//         {/* Overlay buttons */}
//         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={handleViewDetails}
//             className="bg-white/90 hover:bg-white text-black"
//           >
//             <Eye className="w-4 h-4 mr-1" />
//             View
//           </Button>
          
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={handleToggleWishlist}
//             className={`${
//               isInWishlist 
//                 ? 'bg-red-500 hover:bg-red-600 text-white' 
//                 : 'bg-white/90 hover:bg-white text-black'
//             }`}
//           >
//             <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
//           </Button>
//         </div>
//       </div>

//       <CardContent className="p-4">
//         <div className="mb-2">
//           <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
//           <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-pink-600 transition-colors">
//             {product.name}
//           </h3>
//         </div>

//         {/* Rating */}
//         <div className="flex items-center mb-2">
//           <div className="flex items-center">
//             <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//             <span className="ml-1 text-sm font-medium">{product.rating}</span>
//           </div>
//           <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
//         </div>

//         {/* Price */}
//         <div className="flex items-center mb-3">
//           <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
//           {product.originalPrice && (
//             <span className="ml-2 text-sm text-gray-500 line-through">
//               ₹{product.originalPrice}
//             </span>
//           )}
//         </div>

//         {/* Colors */}
//         {product.colors && product.colors.length > 0 && (
//           <div className="mb-3">
//             <p className="text-xs text-gray-600 mb-1">Available in {product.colors.length} colors</p>
//             <div className="flex space-x-1">
//               {product.colors.slice(0, 4).map((color, index) => (
//                 <div
//                   key={index}
//                   className="w-4 h-4 rounded-full border border-gray-300"
//                   style={{
//                     backgroundColor: color.toLowerCase() === 'red' ? '#ef4444' :
//                                    color.toLowerCase() === 'pink' ? '#ec4899' :
//                                    color.toLowerCase() === 'nude' ? '#d4a574' :
//                                    color.toLowerCase() === 'berry' ? '#7c2d92' :
//                                    color.toLowerCase() === 'black' ? '#000000' :
//                                    color.toLowerCase() === 'brown' ? '#8b4513' :
//                                    color.toLowerCase() === 'blue' ? '#3b82f6' :
//                                    '#6b7280'
//                   }}
//                   title={color}
//                 />
//               ))}
//               {product.colors.length > 4 && (
//                 <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Action buttons */}
//         <div className="flex space-x-2">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.inStock}
//             className={`flex-1 ${
//               isInCart 
//                 ? 'bg-green-500 hover:bg-green-600' 
//                 : 'bg-pink-500 hover:bg-pink-600'
//             } text-white`}
//           >
//             <ShoppingCart className="w-4 h-4 mr-2" />
//             {isInCart ? 'Added' : 'Add to Cart'}
//           </Button>
          
//           <Button
//             onClick={handleBuyNow}
//             disabled={!product.inStock}
//             variant="outline"
//             className="flex-1 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
//           >
//             Buy Now
//           </Button>
//         </div>

//         {!product.inStock && (
//           <p className="text-red-500 text-sm mt-2 text-center">Out of Stock</p>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!state.user) {
      dispatch({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }
    
    const orderItems = [{ ...product, quantity: 1 }];
    const total = product.price;
    
    dispatch({ 
      type: 'ADD_ORDER', 
      payload: { items: orderItems, total } 
    });
    
    // Show success message (you could implement a toast system)
    alert(`Order placed successfully for ${product.name}!`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative overflow-hidden">
      {product.bestseller && (
        <Badge className="absolute top-2 left-2 z-10 bg-orange-500 hover:bg-orange-600">
          Bestseller
        </Badge>
      )}
      
      {discountPercentage > 0 && (
        <Badge className="absolute top-2 right-2 z-10 bg-green-500 hover:bg-green-600">
          {discountPercentage}% OFF
        </Badge>
      )}

      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x400/ff69b4/ffffff?text=${encodeURIComponent(product.name)}`;
          }}
        />
        
        {/* Overlay buttons */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleViewDetails}
            className="bg-white/90 hover:bg-white text-black"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            onClick={handleToggleWishlist}
            className={`${
              isInWishlist 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-white/90 hover:bg-white text-black'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-600 font-medium">{product.brand}</p>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-slate-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-slate-700">₹{product.price}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Available in {product.colors.length} colors</p>
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'nude' ? '#d4a574' :
                                   color.toLowerCase() === 'berry' ? '#7c2d92' :
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'brown' ? '#8b4513' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   '#6b7280'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 ${
              isInCart 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-slate-600 hover:bg-slate-700'
            } text-white`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isInCart ? 'Added' : 'Add to Cart'}
          </Button>
          
          <Button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            variant="outline"
            className="flex-1 border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white"
          >
            Buy Now
          </Button>
        </div>

        {!product.inStock && (
          <p className="text-red-500 text-sm mt-2 text-center">Out of Stock</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;