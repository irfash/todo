import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(`token -> ${!!token}`);
     setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
};
