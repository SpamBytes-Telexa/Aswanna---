import React from 'react'
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

import FarmerForm from './Components/Blockchain_Contracts/farmer_from';
import Home from './madhuni/pages/Home';



const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/farmerform",
      element: <FarmerForm />,
    }
  ])

  return (
        <RouterProvider router={router} />
  );
}

export default App
