import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const service_role_key = process.env.REACT_APP_SERVICE_ROLE_KEY;


const supabaseAdminAuth = createClient(supabase_url, service_role_key, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});

// Access auth admin api
const adminAuthClient = supabaseAdminAuth.auth.admin;
export default adminAuthClient;
