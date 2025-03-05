import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("customerID");

  const handleLogout = () => {
    localStorage.removeItem("customerID");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Banking App
        </Link>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-blue-200 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;