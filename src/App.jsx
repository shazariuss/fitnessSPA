import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { supabase } from "./libs/supabase";
import Register from "./features/auth/components/Register";
import Login from "./features/auth/components/Login";
import Dashboard from "./features/dashboard/components/Dashboard";
import ProfileForm from "./features/profile/components/ProfileForm";

function Navbar() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // Redirect to login after logout
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Fitness SPA
                </Link>
                <div className="space-x-4">
                    <Link to="/profile" className="hover:underline">
                        Profile
                    </Link>
                    <Link to="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                    <button onClick={handleLogout} className="hover:underline">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<ProfileForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
