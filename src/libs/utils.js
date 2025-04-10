export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Convert cm to meters
    return weight / (heightInMeters * heightInMeters);
};

export const determineCategory = (goal, bmi) => {
    const goalMap = {
        "Lose Weight": "lose_weight",
        "Gain Weight": "gain_weight",
        "Stay Fit": "stay_fit",
    };
    const selectedCategory = goalMap[goal];

    // Adjust based on BMI if mismatch
    if (bmi > 25 && selectedCategory !== "lose_weight") return "lose_weight";
    if (bmi < 18.5 && selectedCategory !== "gain_weight") return "gain_weight";
    if (bmi >= 18.5 && bmi <= 25 && selectedCategory !== "stay_fit")
        return "stay_fit";
    return selectedCategory;
};
