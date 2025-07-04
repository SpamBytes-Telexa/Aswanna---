import React from 'react'
import FarmerForm from './Components/Blockchain_Contracts/farmer_from';
import Farmer_contracts from './Components/Blockchain_Contracts/farmer_contracts';
import BuyerUI from './Components/Blockchain_Contracts/Buyer_UI';
import OfferDetails from './Components/Blockchain_Contracts/offer_details';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<FarmerForm />} />
        <Route path="/contracts" element={<Farmer_contracts />} />
        <Route path="/buyer" element={<BuyerUI/>} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        </Routes>
      </Router> 
    </div>
  )
}

export default App
