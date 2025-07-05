import React from 'react'
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';

import FarmerForm from './Components/Blockchain_Contracts/farmer_from';
import Farmer_contracts from './Components/Blockchain_Contracts/farmer_contracts';
import BuyerUI from './Components/Blockchain_Contracts/Buyer_UI';
import OfferDetails from './Components/Blockchain_Contracts/offer_details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './madhuni/pages/Home';


const App = () => {

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/farmerform" element={<FarmerForm />} />
          <Route path="/contracts" element={<Farmer_contracts />} />
          <Route path="/buyer" element={<BuyerUI />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
