import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserCircleIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Logo from '../components/Logo';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some((user) => user.email === formData.email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'patient',
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);
      navigate('/patient');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 p-4 relative overflow-hidden">
      {/* Medical Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Top Medical Elements */}
        <div className="absolute top-0 left-0 w-full h-24 flex justify-between px-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`top-${i}`}
              className="relative group"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Brown Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
              
              <div className="relative w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">{
                  i % 3 === 0 ? '🏥' : 
                  i % 3 === 1 ? '⚕️' : 
                  '💊'
                }</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Medical Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 flex justify-between px-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bottom-${i}`}
              className="relative group"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {/* Brown Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
              
              <div className="relative w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">{
                  i % 3 === 0 ? '🩺' : 
                  i % 3 === 1 ? '💉' : 
                  '🧪'
                }</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md perspective-1000 z-20"
      >
        <motion.div
          className="relative group"
          whileHover={{ rotateY: 5, rotateX: 5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Enhanced 3D Card Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 transform-gpu"></div>
          
          {/* Glassmorphism Card */}
          <div className="relative bg-white/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md transform-gpu">
            <div className="p-8">
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ scale: 0.8, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Logo size="large" />
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold text-center text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Create Account
              </motion.h2>
              
              <motion.p 
                className="text-sm text-center text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Or{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300 hover:underline"
                >
                  sign in to your account
                </Link>
              </motion.p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4"
                  >
                    {error}
                  </motion.div>
                )}
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-blue-200 bg-white/50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-300 hover:border-blue-300 transform-gpu hover:scale-[1.02]"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-blue-200 bg-white/50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-300 hover:border-blue-300 transform-gpu hover:scale-[1.02]"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-blue-200 bg-white/50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-300 hover:border-blue-300 transform-gpu hover:scale-[1.02]"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-blue-200 bg-white/50 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-300 hover:border-blue-300 transform-gpu hover:scale-[1.02]"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 25px rgba(37, 99, 235, 0.4)",
                      y: -2,
                      background: "linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 shadow-lg transition-all duration-300 transform-gpu overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center">
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <span className="mr-2">Create Account</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register; 