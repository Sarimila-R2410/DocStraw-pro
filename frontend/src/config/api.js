const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://your-backend-url.onrender.com';
  }
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl(); 