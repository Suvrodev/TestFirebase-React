import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Main from './Layout/Main.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import Registration from './components/Registeration/Registration.jsx';
import Secret from './components/Secret/Secret.jsx';
import AuthProvider from './components/Provider/AuthProvider.jsx';
import PrivateRoute from './components/Private/PrivateRoute.jsx';

const router=createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Registration></Registration>
      },
      {
        path: '/secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
        <RouterProvider router={router}/>
     </AuthProvider>
  </React.StrictMode>,
)
