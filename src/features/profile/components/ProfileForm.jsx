import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { saveProfile, getProfile } from "../api";
import { calculateBMI, determineCategory } from "../../../libs/utils";

function ProfileForm() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        height: "",
        goal: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
            .then((profile) => {
                if (profile) navigate("/dashboard");
            })
            .catch(() => {}); // Ignore error if no profile yet
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bmi = calculateBMI(
                parseFloat(formData.weight),
                parseFloat(formData.height)
            );
            const category = determineCategory(formData.goal, bmi);
            const profileData = { ...formData, category };
            await saveProfile(profileData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full p-2 mb-4 border rounded"
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <input
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight (kg)"
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height (cm)"
                    className="w-full p-2 mb-4 border rounded"
                />
                <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="">Select Goal</option>
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Gain Weight">Gain Weight</option>
                    <option value="Stay Fit">Stay Fit</option>
                </select>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}

export default ProfileForm;
