import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  return (
    <div className="bg-green-800 text-white py-1.5 px-4 w-full shadow-md">
      <div className="flex justify-between items-center">
        {/* Left Side - Title */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold tracking-wide">
            අස්වැන්න
          </span>
        </div>

        {/* Right Side - Icons & Buttons */}
        <div className="flex items-center gap-2">
          <HomeIcon className="cursor-pointer hover:text-yellow-300" fontSize="small" />

          

          <button className="bg-gray-900 hover:bg-gray-700 px-3 py-1 rounded text-xs">
            Logout
          </button>

          <DensityMediumIcon className="cursor-pointer hover:text-yellow-300" fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
