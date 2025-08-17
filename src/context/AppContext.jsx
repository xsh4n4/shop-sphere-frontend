// import React, { createContext, useContext, useReducer } from 'react';

// const AppContext = createContext();

// const initialState = {
//   user: null,
//   cart: [],
//   wishlist: [],
//   orders: [],
//   searchQuery: '',
//   selectedCategory: 'all',
//   isAuthModalOpen: false
// };

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'SET_USER':
//       return { ...state, user: action.payload };
    
//     case 'LOGOUT':
//       return { ...state, user: null };
    
//     case 'ADD_TO_CART':
//       const existingCartItem = state.cart.find(item => item.id === action.payload.id);
//       if (existingCartItem) {
//         return {
//           ...state,
//           cart: state.cart.map(item =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         };
//       }
//       return {
//         ...state,
//         cart: [...state.cart, { ...action.payload, quantity: 1 }]
//       };
    
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload)
//       };
    
//     case 'UPDATE_CART_QUANTITY':
//       return {
//         ...state,
//         cart: state.cart.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         )
//       };
    
//     case 'CLEAR_CART':
//       return { ...state, cart: [] };
    
//     case 'ADD_TO_WISHLIST':
//       if (state.wishlist.find(item => item.id === action.payload.id)) {
//         return state;
//       }
//       return {
//         ...state,
//         wishlist: [...state.wishlist, action.payload]
//       };
    
//     case 'REMOVE_FROM_WISHLIST':
//       return {
//         ...state,
//         wishlist: state.wishlist.filter(item => item.id !== action.payload)
//       };
    
//     case 'ADD_ORDER':
//       return {
//         ...state,
//         orders: [...state.orders, {
//           id: Date.now(),
//           items: action.payload.items,
//           total: action.payload.total,
//           date: new Date().toISOString(),
//           status: 'confirmed'
//         }]
//       };
    
//     case 'SET_SEARCH_QUERY':
//       return { ...state, searchQuery: action.payload };
    
//     case 'SET_CATEGORY':
//       return { ...state, selectedCategory: action.payload };
    
//     case 'TOGGLE_AUTH_MODAL':
//       return { ...state, isAuthModalOpen: !state.isAuthModalOpen };
    
//     case 'SET_AUTH_MODAL':
//       return { ...state, isAuthModalOpen: action.payload };
    
//     default:
//       return state;
//   }
// }

// export function AppProvider({ children }) {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useApp() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// }


import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, cartAPI, wishlistAPI, ordersAPI } from '../services/api';

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: [],
  searchQuery: '',
  selectedCategory: 'all',
  isAuthModalOpen: false,
  loading: false,
  error: null
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, cart: [], wishlist: [], orders: [] };
    
    case 'SET_CART':
      return { ...state, cart: action.payload };
    
    case 'SET_WISHLIST':
      return { ...state, wishlist: action.payload };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'TOGGLE_AUTH_MODAL':
      return { ...state, isAuthModalOpen: !state.isAuthModalOpen };
    
    case 'SET_AUTH_MODAL':
      return { ...state, isAuthModalOpen: action.payload };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize user from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadCurrentUser();
    }
  }, []);

  // Load user data when user is set
  useEffect(() => {
    if (state.user) {
      loadUserData();
    }
  }, [state.user]);

  const loadCurrentUser = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.getCurrentUser();
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      console.error('Failed to load current user:', error);
      localStorage.removeItem('token');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadUserData = async () => {
    try {
      const [cartResponse, wishlistResponse, ordersResponse] = await Promise.all([
        cartAPI.getCart(),
        wishlistAPI.getWishlist(),
        ordersAPI.getOrders()
      ]);

      dispatch({ type: 'SET_CART', payload: cartResponse.items || [] });
      dispatch({ type: 'SET_WISHLIST', payload: wishlistResponse.items || [] });
      dispatch({ type: 'SET_ORDERS', payload: ordersResponse || [] });
    } catch (error) {
      console.error('Failed to load user data:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.login(credentials);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTH_MODAL', payload: false });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.register(userData);
      localStorage.setItem('token', response.token);
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTH_MODAL', payload: false });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addToCart = async (product, quantity = 1) => {
    if (!state.user) {
      dispatch({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }

    try {
      await cartAPI.addToCart(product._id, quantity);
      const cartResponse = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: cartResponse.items || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartAPI.removeFromCart(productId);
      const cartResponse = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: cartResponse.items || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await cartAPI.updateCartItem(productId, quantity);
      const cartResponse = await cartAPI.getCart();
      dispatch({ type: 'SET_CART', payload: cartResponse.items || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clearCart();
      dispatch({ type: 'SET_CART', payload: [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const addToWishlist = async (product) => {
    if (!state.user) {
      dispatch({ type: 'SET_AUTH_MODAL', payload: true });
      return;
    }

    try {
      await wishlistAPI.addToWishlist(product._id);
      const wishlistResponse = await wishlistAPI.getWishlist();
      dispatch({ type: 'SET_WISHLIST', payload: wishlistResponse.items || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      const wishlistResponse = await wishlistAPI.getWishlist();
      dispatch({ type: 'SET_WISHLIST', payload: wishlistResponse.items || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const createOrder = async (orderData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await ordersAPI.createOrder(orderData);
      const [cartResponse, ordersResponse] = await Promise.all([
        cartAPI.getCart(),
        ordersAPI.getOrders()
      ]);
      dispatch({ type: 'SET_CART', payload: cartResponse.items || [] });
      dispatch({ type: 'SET_ORDERS', payload: ordersResponse || [] });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    state,
    dispatch,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    createOrder
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
