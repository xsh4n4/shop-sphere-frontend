// import React, { useState } from 'react';
// import { X, User, Phone } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useApp } from '../context/AppContext';

// const AuthModal = () => {
//   const { state, dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     email: ''
//   });
//   const [isSignUp, setIsSignUp] = useState(false);

//   const handleClose = () => {
//     dispatch({ type: 'SET_AUTH_MODAL', payload: false });
//     setFormData({ name: '', mobile: '', email: '' });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name.trim() || !formData.mobile.trim()) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     if (formData.mobile.length !== 10) {
//       alert('Please enter a valid 10-digit mobile number');
//       return;
//     }

//     dispatch({ type: 'SET_USER', payload: formData });
//     handleClose();
//     alert(`Welcome ${formData.name}! You have been signed in successfully.`);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   if (!state.isAuthModalOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="relative">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleClose}
//             className="absolute right-2 top-2 p-1"
//           >
//             <X className="w-4 h-4" />
//           </Button>
//           <CardTitle className="text-center text-2xl font-bold text-pink-600">
//             {isSignUp ? 'Create Account' : 'Sign In'}
//           </CardTitle>
//           <p className="text-center text-gray-600">
//             {isSignUp ? 'Join Nykaa for exclusive deals' : 'Welcome back to Nykaa'}
//           </p>
//         </CardHeader>
        
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="name" className="flex items-center">
//                 <User className="w-4 h-4 mr-2" />
//                 Full Name *
//               </Label>
//               <Input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name"
//                 className="mt-1"
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="mobile" className="flex items-center">
//                 <Phone className="w-4 h-4 mr-2" />
//                 Mobile Number *
//               </Label>
//               <Input
//                 id="mobile"
//                 name="mobile"
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={handleInputChange}
//                 placeholder="Enter 10-digit mobile number"
//                 className="mt-1"
//                 maxLength={10}
//                 pattern="[0-9]{10}"
//                 required
//               />
//             </div>

//             {isSignUp && (
//               <div>
//                 <Label htmlFor="email">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   placeholder="Enter your email (optional)"
//                   className="mt-1"
//                 />
//               </div>
//             )}

//             <Button
//               type="submit"
//               className="w-full bg-pink-500 hover:bg-pink-600 text-white"
//             >
//               {isSignUp ? 'Create Account' : 'Sign In'}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//               <button
//                 type="button"
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="ml-1 text-pink-600 hover:text-pink-700 font-medium"
//               >
//                 {isSignUp ? 'Sign In' : 'Sign Up'}
//               </button>
//             </p>
//           </div>

//           <div className="mt-4 text-xs text-gray-500 text-center">
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AuthModal;

import React, { useState } from 'react';
import { X, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '../context/AppContext';

const AuthModal = () => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleClose = () => {
    dispatch({ type: 'SET_AUTH_MODAL', payload: false });
    setFormData({ name: '', mobile: '', email: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    dispatch({ type: 'SET_USER', payload: formData });
    handleClose();
    alert(`Welcome ${formData.name}! You have been signed in successfully.`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!state.isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-2 top-2 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-center text-2xl font-bold text-slate-700">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
          <p className="text-center text-gray-600">
            {isSignUp ? 'Join ShopSphere for exclusive deals' : 'Welcome back to ShopSphere'}
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Mobile Number *
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter 10-digit mobile number"
                className="mt-1"
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <Label htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email (optional)"
                  className="mt-1"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-700 text-white"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-slate-600 hover:text-slate-700 font-medium"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;