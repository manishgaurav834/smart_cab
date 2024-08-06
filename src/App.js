import React from 'react';
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import AuthState from './context/authstate';
import Login from './components/Login';
import Signin from './components/Signup';
import CabState from './context/cabstate';
import TripState from './context/tripstate';


import Favicon from 'react-favicon';




function App() {
  const router= createBrowserRouter([
    {path:"/",element:<><Home/></>},
    {path:"/login",element:<><Login/></>},
    {path:"/signup",element:<><Signin/></>}
    
  ])

  

  
  return (
   <>
   <Favicon url="http://oflisback.github.io/react-favicon/img/github.ico"/>
   <AuthState>
  <CabState>
    <TripState>
   <RouterProvider router={router}/>
   </TripState>
   </CabState>
   </AuthState>
  
   
   </>
  );
}

export default App;
