import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Banking App
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
          <Link to="/dashboard" className="hover:text-blue-200">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;