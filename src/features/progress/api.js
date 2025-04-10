import { supabase } from "../../libs/supabase";

export const getProgress = async () => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("progress")
        .select("week, completed")
        .eq("user_id", user.id);
    if (error) throw error;
    return data;
};

export const updateProgress = async (week, completed) => {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
        .from("progress")
        .upsert(
            { user_id: user.id, week, completed },
            { onConflict: ["user_id", "week"] }
        );
    if (error) throw error;
    return data;
};
