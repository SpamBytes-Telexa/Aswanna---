import React from "react";

import FarmerForm from "./Components/Blockchain_Contracts/Farmer/farmer_form";
import Farmer_contracts from "./Components/Blockchain_Contracts/Farmer/farmer_contracts";
import BuyerUI from "./Components/Blockchain_Contracts/Buyer/Buyer_UI";
import OfferDetails from "./Components/Blockchain_Contracts/Buyer/offer_details";

//import Chatbot from './madhuni/pages/Chatbot';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDisease from "./Raleesa/plant_disease_recogntion";
import MyPurchases from "./Components/Blockchain_Contracts/Buyer/my_purchases";

import Home from "./madhuni/pages/Home";

//import Weather from "./madhuni/pages/Weather"
import Weather from "./madhuni/pages/Weather";
import Chatbot from "./madhuni/pages/Chatbot";

import CropRecommendationForm from "./Pages/cropRecommendationForm";

import { useNavigate } from "react-router-dom";
import SignUp from "./Components/SignUp/sign_up";
import Login from "./Components/Login/login";
import { AuthProvider } from "./Components/context/AuthContext";
import "./i18n";
import Main from "./Pages/mainPage";
import WeatherApp from "./madhuni/pages/Weather";
import FarmerCommunity from "./Pages/farmerCommunity";
import Chat from "./Components/FarmerCommunity/chat";
import FarmerProfileForm from "./madhuni/components/farmerProfileForm";
import Discounts from "./Pages/discounts";
import FarmerHome from "./Components/Blockchain_Contracts/Farmer/farmer_home";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmerform" element={<FarmerForm />} />
          <Route path="/contracts" element={<Farmer_contracts />} />
          <Route path="/buyer" element={<BuyerUI />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/my_purchases" element={<MyPurchases />} />

          {/* Weather and Chatbot routes */}
          {/* <Route path="/weatherforecast" element={<Weather />} /> */}
          {/* <Route path="/chatbot" element={<Chatbot />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/farmer" element={<Home />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmerform" element={<FarmerForm />} />
          <Route path="/contracts" element={<Farmer_contracts />} />
          <Route path="/buyer" element={<BuyerUI />} />
          <Route path="/offer/:id" element={<OfferDetails />} />
          <Route path="/my_purchases" element={<MyPurchases />} />
          <Route path="/farmer_home" element={<FarmerHome />} />

          {/* Weather and Chatbot routes */}
          <Route path="/weatherforecast" element={<Weather />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Crop Recommendation Routes */}
          <Route
            path="/crop-recommendation"
            element={<CropRecommendationForm />}
          />

          <Route path="/plantDisease" element={<PlantDisease />} />

          <Route path="/farmercommunity" element={<FarmerCommunity />} />
          <Route path="/farmercommunity/chat" element={<Chat />} />

          <Route path="/farmerProfile" element={<FarmerProfileForm />} />
          <Route path="/discounts" element={<Discounts />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
//<Route path="/weatherforecast" element={<Weather/>}/>
//<Route path="/chatbot" element={<Chatbot/>}/>
