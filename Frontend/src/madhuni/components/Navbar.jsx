import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from 'react';
import contracts from '../../assets/farmer_contract.png'; // Example image import
import community from '../../assets/community.png'; // Example image import

function Navbar() {
  const navigate = useNavigate(); // ✅ use the hook
  const [loggedIn, setLoggedIn] = useState(false); 

  const isFarmer = localStorage.getItem("role") === '"farmer"';

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        setLoggedIn(true);
    }
  },[]);

  return (
    <div className="bg-green-800 text-white py-1 px-4 w-full h-14 md:h-16 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left Side - Title */}
        <div className="flex m-2 items-center gap-4">
          <span className="text-lg font-bold tracking-wide">
            අස්වැන්න
          </span>
        </div>

        {/* Right Side - Icons & Buttons */}
        <div className="flex m-2 items-center gap-2">
          <HomeIcon
            className="cursor-pointer hover:text-yellow-300"
            fontSize="small"
            onClick={() => navigate('/')} // optional: make Home icon work too
          />
          {isFarmer && (
            <>
              <img
                src={contracts}
                alt="Contracts"
                className="cursor-pointer w-8 h-8 m-2"
                onClick={() => navigate('/contracts')}
              />
              <img
                src={community}
                alt="Contracts"
                className="cursor-pointer w-8 h-8 m-2"
                onClick={() => navigate('/farmercommunity')}
              />
            </>
            
          )}
          {console.log(isFarmer)}
          {loggedIn ? (
            <button className="bg-gray-900 hover:bg-gray-700 px-3 py-1 m-2 rounded text-xs"
            onClick={() => {
              localStorage.removeItem("token");
              navigate('/login'); 
              setLoggedIn(false); 
            }}>
              Logout
            </button>
          ):(
              <>
                <button
                  className="bg-white hover:bg-gray-200 text-black font-medium px-3 py-1 m-2 rounded text-xs"
                  onClick={() => navigate('/login')} // ✅ Corrected
                >
                  Login
                </button>

                <button className="bg-white hover:bg-gray-200 text-black font-medium px-3 py-1 m-2 rounded text-xs"
                  onClick={() => navigate('/signup')}> 
                  Register
                </button>
              </>
          )}

          <DensityMediumIcon className="cursor-pointer hover:text-yellow-300" fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
