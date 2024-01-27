import { QueryClientProvider } from 'react-query';
import './App.css';
import Home from './page/home'
import queryClient from './query/queryClient';
import Login from './page/auth/Login';
import Signup from './page/auth/Signup';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { ProtectedRouteWrapper } from './page/auth/ProtectedRouterWrapper';
import Temp from './page/Temp';
import { AuthProvider } from './api/AuthContext';

const router = createBrowserRouter([
  {
    path : "/home",
    element:
    <ProtectedRouteWrapper>

      <Home />
    </ProtectedRouteWrapper>
  },{
    path:"/login",
    element:<Login />
  },{
    path:"/signup",
    element:<Signup />
  },{
    path:"/temp",
    element:<Temp />
  }
])


function App() {
  return (
    <AuthProvider>

    <QueryClientProvider client={queryClient}>
    <div className="App">
      <div className='dash'>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      <RouterProvider router={router}/>
      </div>
    </div>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
