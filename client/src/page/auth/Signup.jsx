import React, { useState } from 'react'
import './Login.css'
import { useMutation } from 'react-query'
import { signupUser } from '../../api/authApi'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../api/AuthContext';
// ... other imports ...

const Signup = () => {
  const validateSignup = (data) => {
    let errors = {};
  
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    return errors;
  };
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState({});
  const {login} = useAuth();
  const mutate = useMutation(signupUser, {
    onSuccess: (data) => {
      // Handle the token here
      if(data && data.token){
        login(data.token,data.user_id,data.name)
        navigate('/home');
      }
    },
    onError: (error) => {
      // Handle API error here
      console.error('Signup error:', error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const validationErrors = validateSignup(formValues);
    if (Object.keys(validationErrors).length === 0) {
      mutate.mutate(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='login-container'>
      <h2>Signup</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <input name='name' className='name' placeholder='name'/>
        {errors.name && <div className="error">{errors.name}</div>}

        <input name='email' className='email' placeholder='email'/>
        {errors.email && <div className="error">{errors.email}</div>}

        <input name='password' type='password' className='password' placeholder='Password'/>
        {errors.password && <div className="error">{errors.password}</div>}

        <button className='btn signup-btn' type="submit" disabled={mutate.isLoading}>Signup</button>
      </form>

    <Link to="/login" className='nav'> -- Login -- </Link>
    </div>
  );
};

export default Signup;