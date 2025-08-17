import React, { useState } from 'react';
import './App.css';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Orders from './components/Orders';
import AuthModal from './components/AuthModal';
import ProductDetail from './components/ProductDetail';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'cart':
        return <Cart setCurrentView={setCurrentView} />;
      case 'wishlist':
        return <Wishlist setCurrentView={setCurrentView} onViewDetails={handleViewDetails} />;
      case 'orders':
        return <Orders setCurrentView={setCurrentView} />;
      default:
        return <Home onViewDetails={handleViewDetails} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        <main>
          {renderCurrentView()}
        </main>
        <AuthModal />
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={closeProductDetail} 
          />
        )}
      </div>
    </AppProvider>
  );
}

export default App;
