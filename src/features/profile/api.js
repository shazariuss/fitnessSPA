import { supabase } from "../../libs/supabase";

export const saveProfile = async (profileData) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    const { data, error } = await supabase
        .from("users")
        .upsert({ ...profileData, id: user.id, email: user.email });
    if (error) throw error;
    return data;
};

export const getProfile = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
    if (error) throw error;
    return data;
};
