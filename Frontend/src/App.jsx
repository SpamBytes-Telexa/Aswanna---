
import React from 'react'

import FarmerForm from './Components/Blockchain_Contracts/farmer_from';
import Farmer_contracts from './Components/Blockchain_Contracts/farmer_contracts';
import BuyerUI from './Components/Blockchain_Contracts/Buyer_UI';
import OfferDetails from './Components/Blockchain_Contracts/offer_details';
import Chatbot from './madhuni/pages/Chatbot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './madhuni/pages/Home';


import FarmerForm from "./Components/Blockchain_Contracts/farmer_from";
import Farmer_contracts from "./Components/Blockchain_Contracts/farmer_contracts";
import BuyerUI from "./Components/Blockchain_Contracts/Buyer_UI";
import OfferDetails from "./Components/Blockchain_Contracts/offer_details";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./madhuni/pages/Home";
import CropRecommendationForm from "./Pages/cropRecommendationForm";
import RecommendationResults from "./Pages/recommendationResult";

const App = () => {
  const CropRecommendationFormWithNav = () => {
    const navigate = useNavigate();
    const handleSubmit = (formData) => {
      navigate("/recommendation-results", { state: { formData } });
    };
    return <CropRecommendationForm onSubmit={handleSubmit} />;
  };

  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>

          <Route path="/farmerform" element={<FarmerForm />} />
          <Route path="/contracts" element={<Farmer_contracts />} />
          <Route path="/buyer" element={<BuyerUI />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route
            path="/crop-recommendation"
            element={<CropRecommendationFormWithNav />}
          />
          <Route
            path="/recommendation-results"
            element={<RecommendationResults />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
