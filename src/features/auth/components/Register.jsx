import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signup } from "../api";
import { supabase } from "../../../libs/supabase";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate("/dashboard");
        });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate("/profile");
        } catch (error) {
            console.error("Signup error:", error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">
                    Login
                </a>
            </p>
        </div>
    );
}

export default Register;
