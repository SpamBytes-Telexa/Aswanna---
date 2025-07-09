import { useNavigate } from 'react-router-dom';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-green-800 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-sm">
            🌾 අස්වැන්න
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="hover:text-yellow-300 transition-colors duration-200"
            title="Home"
          >
            <HomeIcon fontSize="medium" />
          </button>

          <button
            onClick={() => navigate('/buyer')}
            className="px-4 py-1.5 bg-white text-green-800 font-semibold text-sm rounded-lg shadow hover:bg-gray-100 transition duration-150"
          >
              🛒 Marketplace
          </button>

          

          <button
            className="hover:text-yellow-300 transition-colors duration-200"
            title="Menu"
          >
            <DensityMediumIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
