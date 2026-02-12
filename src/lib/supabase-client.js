import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const Supabase = createClient(supabaseURL, supabaseKey);
export default Supabase;