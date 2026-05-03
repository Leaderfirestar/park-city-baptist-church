import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for server-side use.
 * Call this inside Route Handlers, Server Actions, and DAL functions.
 * Do NOT export a singleton — call this function each time to avoid
 * shared state across concurrent requests.
 */
export function createServerClient() {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			"Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.",
		);
	}

	return createClient(supabaseUrl, supabaseAnonKey);
}
