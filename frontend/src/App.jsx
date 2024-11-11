import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import AddCustomer from "./pages/AddCustomer.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./pages/Navbar.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-customer" element={<AddCustomer />} />
            </Routes>
        </BrowserRouter>
    )
}