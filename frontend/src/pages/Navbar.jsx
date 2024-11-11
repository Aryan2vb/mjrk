import logo from '../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogo = () => {
        navigate('/dashboard');
    };

    const handleAddCustomer = () => {
        navigate('/add-customer');
    };

    const handleLogout = () => {
        // Clear the login state
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return (
        <nav className="bg-white shadow-md p-2">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={handleLogo}>
                    <img src={logo} alt="Logo" className="h-30 w-60" />
                </div>

                {/* Navbar Buttons */}
                <div className="flex space-x-5">
                    {/* Dashboard button, visible only when the user is logged in */}
                    {isLoggedIn && (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-[#4962bf] text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                            Dashboard
                        </button>
                    )}

                    {!isLoggedIn ? (
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleAddCustomer}
                                className="bg-[#4962bf] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Add Customer
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
