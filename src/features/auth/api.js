import { supabase } from "../../libs/supabase";

export const signup = async (email, password) => {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;

    return data;
};

export const login = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    return data;
};
