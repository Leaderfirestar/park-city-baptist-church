import { createServerClient } from "@/lib/supabase/server";

export interface Sermon {
	id: number;
	created_at: string;
	title: string;
	description: string | null;
	date: string;
	url: string | null;
	is_live: boolean;
}

export interface SermonQueryParams {
	page?: number;
	pageSize?: number;
	dateFrom?: string;
	dateTo?: string;
	isLivestream?: boolean;
}

export interface SermonQueryResult {
	sermons: Sermon[];
	total: number;
}

export async function getSermons(
	params: SermonQueryParams = {},
): Promise<SermonQueryResult> {
	const supabase = createServerClient();
	const { page = 1, pageSize = 20, dateFrom, dateTo, isLivestream } = params;

	let query = supabase
		.from("sermon")
		.select("*", { count: "exact" })
		.order("date", { ascending: false })
		.range((page - 1) * pageSize, page * pageSize - 1);

	if (dateFrom) {
		query = query.gte("date", dateFrom);
	}
	if (dateTo) {
		query = query.lte("date", dateTo);
	}
	if (isLivestream !== undefined) {
		query = query.eq("is_live", isLivestream);
	}

	const { data, error, count } = await query;

	if (error) throw new Error(`Failed to fetch sermons: ${error.message}`);

	return {
		sermons: data ?? [],
		total: count ?? 0,
	};
}

export async function getSermonById(id: number): Promise<Sermon | null> {
	const supabase = createServerClient();

	const { data, error } = await supabase
		.from("sermon")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		if (error.code === "PGRST116") return null; // not found
		throw new Error(`Failed to fetch sermon: ${error.message}`);
	}

	return data;
}
