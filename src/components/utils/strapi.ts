const STRAPI_URL = process.env.STRAPI_URL || "https://your-strapi-instance/api";

export interface Sermon {
	id: number;
	title: string;
	date: string;
	speaker: string;
	youtubeUrl: string;
	description?: string;
	tags?: string[];
	isLivestream?: boolean;
	livestreamUrl?: string;
}

export interface SermonQueryParams {
	page?: number;
	pageSize?: number;
	title?: string;
	speaker?: string[];
	tags?: string[];
	dateFrom?: string;
	dateTo?: string;
	isLivestream?: boolean;
}

export interface SermonQueryResult {
	sermons: Sermon[];
	total: number;
}

function buildQuery(params: SermonQueryParams): string {
	const query = new URLSearchParams();
	if (params.page) query.append("page", params.page.toString());
	if (params.pageSize) query.append("pageSize", params.pageSize.toString());
	if (params.title) query.append("title", params.title);
	if (params.speaker) params.speaker.forEach((s) => query.append("speaker", s));
	if (params.tags) params.tags.forEach((t) => query.append("tags", t));
	if (params.dateFrom) query.append("dateFrom", params.dateFrom);
	if (params.dateTo) query.append("dateTo", params.dateTo);
	if (params.isLivestream !== undefined)
		query.append("isLivestream", params.isLivestream ? "true" : "false");
	return query.toString();
}

export async function fetchSermons(
	params: SermonQueryParams,
): Promise<SermonQueryResult> {
	const query = buildQuery(params);
	const res = await fetch(`${STRAPI_URL}/sermons?${query}`);
	if (!res.ok) throw new Error("Failed to fetch sermons");
	const data = await res.json();
	// Adjust mapping as needed to match your Strapi response
	return {
		sermons: data.data.map((item: any) => ({
			id: item.id,
			title: item.attributes.title,
			date: item.attributes.date,
			speaker: item.attributes.speaker,
			youtubeUrl: item.attributes.youtubeUrl,
			description: item.attributes.description,
			tags: item.attributes.tags,
			isLivestream: item.attributes.isLivestream,
			livestreamUrl: item.attributes.livestreamUrl,
		})),
		total: data.meta?.pagination?.total || data.data.length,
	};
}
