
import React from 'react'

import FarmerForm from './Components/Blockchain_Contracts/Farmer/farmer_form';
import Farmer_contracts from './Components/Blockchain_Contracts/Farmer/farmer_contracts';
import BuyerUI from './Components/Blockchain_Contracts/Buyer/Buyer_UI';
import OfferDetails from './Components/Blockchain_Contracts/Buyer/offer_details';
import Chatbot from './madhuni/pages/Chatbot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlantDisease from './Raleesa/plant_disease_recogntion';
import Home from "./madhuni/pages/Home";

import Weather from "./madhuni/pages/Weather"



import CropRecommendationForm from "./Pages/cropRecommendationForm";
import RecommendationResults from "./Pages/recommendationResult";
import { useNavigate } from 'react-router-dom';
import SignUp from './Components/SignUp/sign_up';
import Login from './Components/Login/login';
import { AuthProvider } from './Components/context/AuthContext';
import "./i18n";
const App = () => {
  const CropRecommendationFormWithNav = () => {
    const navigate = useNavigate();
    const handleSubmit = (formData) => {
      navigate("/recommendation-results", { state: { formData } });
    };
    return <CropRecommendationForm onSubmit={handleSubmit} />;
  };

  return (
      <Router>

      

          
          


          
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/chatbot" element={<Chatbot/>}/>
            <Route path="/weatherforecast" element={<Weather/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
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

            <Route path="plantDisease" element={<PlantDisease/>}/>
          </Routes>
        </AuthProvider>

      </Router>
    
  );
};

export default App;
