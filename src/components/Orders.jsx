import React from 'react';
import { Package, Calendar, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';

const Orders = ({ setCurrentView }) => {
  const { state } = useApp();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!state.user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('home')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        <Card className="text-center py-16">
          <CardContent>
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Please sign in to view orders</h2>
            <p className="text-gray-500 mb-6">You need to be logged in to access your order history.</p>
            <Button
              onClick={() => {
                setCurrentView('home');
                // This would trigger the auth modal
              }}
              className="bg-slate-500 hover:bg-slate-600 text-white"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state.orders.length === 0) {
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
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        <Card className="text-center py-16">
          <CardContent>
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
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
        <h1 className="text-3xl font-bold">My Orders ({state.orders.length})</h1>
      </div>

      <div className="space-y-6">
        {state.orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(order.date)}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <div className="text-lg font-bold text-slate-600 mt-1">
                    ₹{order.total}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/64x64/ff69b4/ffffff?text=${encodeURIComponent(item.name.slice(0, 2))}`;
                      }}
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">₹{item.price}</p>
                      <p className="text-sm text-gray-600">
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Invoice
                  </Button>
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      Return/Exchange
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order summary */}
      <Card className="mt-8 bg-slate-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-600">{state.orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ₹{state.orders.reduce((total, order) => total + order.total, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {state.orders.filter(order => order.status === 'delivered').length}
              </div>
              <div className="text-sm text-gray-600">Delivered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {state.orders.reduce((total, order) => total + order.items.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Items Purchased</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;

