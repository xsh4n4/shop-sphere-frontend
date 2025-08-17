import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '../context/AppContext';

const Cart = ({ setCurrentView }) => {
  const { state, dispatch } = useApp();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id: productId, quantity: newQuantity } 
      });
    }
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!state.user) {
      dispatch({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }

    if (state.cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderItems = [...state.cart];
    const total = getTotalPrice();
    
    dispatch({ 
      type: 'ADD_ORDER', 
      payload: { items: orderItems, total } 
    });
    
    dispatch({ type: 'CLEAR_CART' });
    
    alert('Order placed successfully! Check your orders page for details.');
    setCurrentView('orders');
  };

  if (state.cart.length === 0) {
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
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        <Card className="text-center py-16">
          <CardContent>
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
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
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentView('home')}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart ({getTotalItems()} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/80x80/ff69b4/ffffff?text=${encodeURIComponent(item.name.slice(0, 2))}`;
                    }}
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.brand}</p>
                    <p className="text-pink-600 font-bold text-lg">₹{item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>Included</span>
              </div>
              
              <hr />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-pink-600">₹{getTotalPrice()}</span>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-slate-500 hover:bg-slate-600 text-white text-lg py-3"
                >
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Free shipping on orders above ₹299
                </p>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  🎉 You saved ₹{state.cart.reduce((total, item) => {
                    const savings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
                    return total + savings;
                  }, 0)} on this order!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;

