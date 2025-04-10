import { supabase } from "../../libs/supabase";

export const getWorkouts = async (category) => {
    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("category", category)
        .order("week", { ascending: true });
    if (error) throw error;
    return data;
};

export const getMeals = async (category) => {
    const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("category", category)
        .order("week", { ascending: true });
    if (error) throw error;
    return data;
};
