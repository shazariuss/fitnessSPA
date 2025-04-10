import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gxikjtjewkwczvsciove.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aWtqdGpld2t3Y3p2c2Npb3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDgzNDcsImV4cCI6MjA1OTc4NDM0N30.GEMHSiv-w4YQLU4NUotAMrIgHzkFJ5xyxlWGUEXhU-o";
export const supabase = createClient(supabaseUrl, supabaseKey);
