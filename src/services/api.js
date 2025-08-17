// const API_BASE_URL = 'http://localhost:5000/api';

// // Helper function to get auth token
// const getAuthToken = () => {
//   return localStorage.getItem('token');
// };

// // Helper function to make authenticated requests
// const makeRequest = async (url, options = {}) => {
//   const token = getAuthToken();
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const response = await fetch(`${API_BASE_URL}${url}`, {
//     ...options,
//     headers,
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Something went wrong');
//   }

//   return response.json();
// };

// // Auth API
// export const authAPI = {
//   register: async (userData) => {
//     return makeRequest('/auth/register', {
//       method: 'POST',
//       body: JSON.stringify(userData),
//     });
//   },

//   login: async (credentials) => {
//     return makeRequest('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     });
//   },

//   getCurrentUser: async () => {
//     return makeRequest('/auth/me');
//   },
// };

// // Products API
// export const productsAPI = {
//   getProducts: async (params = {}) => {
//     const queryString = new URLSearchParams(params).toString();
//     return makeRequest(`/products${queryString ? `?${queryString}` : ''}`);
//   },

//   getProduct: async (id) => {
//     return makeRequest(`/products/${id}`);
//   },

//   createProduct: async (productData) => {
//     return makeRequest('/products', {
//       method: 'POST',
//       body: JSON.stringify(productData),
//     });
//   },

//   updateProduct: async (id, productData) => {
//     return makeRequest(`/products/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(productData),
//     });
//   },

//   deleteProduct: async (id) => {
//     return makeRequest(`/products/${id}`, {
//       method: 'DELETE',
//     });
//   },

//   addReview: async (id, reviewData) => {
//     return makeRequest(`/products/${id}/reviews`, {
//       method: 'POST',
//       body: JSON.stringify(reviewData),
//     });
//   },

//   getCategories: async () => {
//     return makeRequest('/products/categories/all');
//   },
// };

// // Cart API
// export const cartAPI = {
//   getCart: async () => {
//     return makeRequest('/cart');
//   },

//   addToCart: async (productId, quantity = 1) => {
//     return makeRequest('/cart/add', {
//       method: 'POST',
//       body: JSON.stringify({ productId, quantity }),
//     });
//   },

//   updateCartItem: async (productId, quantity) => {
//     return makeRequest('/cart/update', {
//       method: 'PUT',
//       body: JSON.stringify({ productId, quantity }),
//     });
//   },

//   removeFromCart: async (productId) => {
//     return makeRequest(`/cart/remove/${productId}`, {
//       method: 'DELETE',
//     });
//   },

//   clearCart: async () => {
//     return makeRequest('/cart/clear', {
//       method: 'DELETE',
//     });
//   },
// };

// // Wishlist API
// export const wishlistAPI = {
//   getWishlist: async () => {
//     return makeRequest('/wishlist');
//   },

//   addToWishlist: async (productId) => {
//     return makeRequest('/wishlist/add', {
//       method: 'POST',
//       body: JSON.stringify({ productId }),
//     });
//   },

//   removeFromWishlist: async (productId) => {
//     return makeRequest(`/wishlist/remove/${productId}`, {
//       method: 'DELETE',
//     });
//   },

//   clearWishlist: async () => {
//     return makeRequest('/wishlist/clear', {
//       method: 'DELETE',
//     });
//   },

//   checkWishlistItem: async (productId) => {
//     return makeRequest(`/wishlist/check/${productId}`);
//   },
// };

// // Orders API
// export const ordersAPI = {
//   getOrders: async () => {
//     return makeRequest('/orders');
//   },

//   getOrder: async (id) => {
//     return makeRequest(`/orders/${id}`);
//   },

//   createOrder: async (orderData) => {
//     return makeRequest('/orders/create', {
//       method: 'POST',
//       body: JSON.stringify(orderData),
//     });
//   },

//   updateOrderStatus: async (id, status) => {
//     return makeRequest(`/orders/${id}/status`, {
//       method: 'PUT',
//       body: JSON.stringify({ status }),
//     });
//   },

//   cancelOrder: async (id) => {
//     return makeRequest(`/orders/${id}/cancel`, {
//       method: 'PUT',
//     });
//   },
// };
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const makeRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Construct full URL, handling cases where url might already have query params
  const fullUrl = url.startsWith('http') 
    ? url 
    : `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch (e) {
        error = { message: await response.text() || 'Something went wrong' };
      }
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getCurrentUser: async () => {
    return makeRequest('/auth/me');
  },
};

// Products API
export const productsAPI = {
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: async (id) => {
    return makeRequest(`/products/${id}`);
  },

  createProduct: async (productData) => {
    return makeRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id, productData) => {
    return makeRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id) => {
    return makeRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  addReview: async (id, reviewData) => {
    return makeRequest(`/products/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  getCategories: async () => {
    return makeRequest('/products/categories/all');
  },
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    return makeRequest('/cart');
  },

  addToCart: async (productId, quantity = 1) => {
    return makeRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateCartItem: async (productId, quantity) => {
    return makeRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  removeFromCart: async (productId) => {
    return makeRequest(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  },

  clearCart: async () => {
    return makeRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: async () => {
    return makeRequest('/wishlist');
  },

  addToWishlist: async (productId) => {
    return makeRequest('/wishlist/add', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  removeFromWishlist: async (productId) => {
    return makeRequest(`/wishlist/remove/${productId}`, {
      method: 'DELETE',
    });
  },

  clearWishlist: async () => {
    return makeRequest('/wishlist/clear', {
      method: 'DELETE',
    });
  },

  checkWishlistItem: async (productId) => {
    return makeRequest(`/wishlist/check/${productId}`);
  },
};

// Orders API
export const ordersAPI = {
  getOrders: async () => {
    return makeRequest('/orders');
  },

  getOrder: async (id) => {
    return makeRequest(`/orders/${id}`);
  },

  createOrder: async (orderData) => {
    return makeRequest('/orders/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  updateOrderStatus: async (id, status) => {
    return makeRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  cancelOrder: async (id) => {
    return makeRequest(`/orders/${id}/cancel`, {
      method: 'PUT',
    });
  },
};