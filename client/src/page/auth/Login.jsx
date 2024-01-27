import React, { useState } from 'react'
import './Login.css'
import { useMutation } from 'react-query'
import { LoginUser } from '../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../component/loadingSpinner';
import { useAuth } from '../../api/AuthContext';
const Login = () => {

const {login} = useAuth();

  const [errors,setErrors] = useState({})
  const [apiErros,setApiErrors] = useState('');
  const navigate = useNavigate();
  const mutate = useMutation(LoginUser,{
    onSuccess:(data)=>{
      if(data && data.token){
        login(data.token,data.user_id,data.name)        
        navigate('/home');
      }
      setApiErrors('')
      setErrors({});
    },
    onError :(error)=>{
    setApiErrors(error.response?.data?.message || 'An error occured');
    }
  });

const validateLoginData = (data)=>{
 const errors = {};


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


}

  const handelLogin = (e)=>{
e.preventDefault();

const formData = new FormData(e.currentTarget)
const formValues = Object.fromEntries(formData.entries());
const validationErrors = validateLoginData(formValues);
console.log(formValues);
if(Object.keys(validationErrors).length === 0 ){

mutate.mutate(formValues);
}
else{
  setErrors(validationErrors);
}
console.log(errors);
}
if(mutate.isLoading) return <LoadingSpinner />


  return (
    <div className='login-container'>
  <h2>Login</h2>
 <form action="" className='login-form' onSubmit={handelLogin}>
  <input name='email' className='email' placeholder='email'/>
        {errors.email && <div className="error">{errors.email}</div>}
  <input name='password' className='password' placeholder='Password'  />
        {errors.password && <div className="error">{errors.password}</div>}
  <button className='login-btn' type='submit' disabled={mutate.isLoading}>Login</button>
 </form> 
    <Link to="/signup" className='nav'> --SignUp -- </Link>

    </div>
    )
}

export default Login
