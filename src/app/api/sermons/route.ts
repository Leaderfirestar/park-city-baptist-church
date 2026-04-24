import { NextResponse } from "next/server";

// Mock data representing fetched and structured data from Strapi
const mockSermons = [
	{
		id: 1,
		title: "Sermon on Faith and Perseverance",
		sermonDate: "2026-04-13",
		keywords: ["faith", "perseverance", "scripture"],
		youtubeVideoId: "abcdef12345", // Replace with actual unlisted YouTube ID
	},
	{
		id: 2,
		title: "Understanding Grace in Times of Doubt",
		sermonDate: "2026-03-30",
		keywords: ["grace", "doubt", "forgiveness"],
		youtubeVideoId: "ghijkl67890", // Replace with actual unlisted YouTube ID
	},
	{
		id: 3,
		title: "The Joy of Community Fellowship",
		sermonDate: "2026-03-16",
		keywords: ["community", "fellowship", "gathering"],
		youtubeVideoId: "mnopqr11223", // Replace with actual unlisted YouTube ID
	},
	{
		id: 4,
		title: "Looking Forward: Harvest Season Message",
		sermonDate: "2026-03-02",
		keywords: ["harvest", "future", "wisdom"],
		youtubeVideoId: "stuvwx33445", // Replace with actual unlisted YouTube ID
	},
];

export async function GET() {
	// Handles GET requests: Fetching the main list of sermons for the website display
	return NextResponse.json(mockSermons);
}

export async function POST(request: Request) {
	// Handles POST requests: Ingesting newly archived sermon data (POSTING TO STRAPI/INTERNAL STORE)
	const body = await request.json();
	const { title, sermonDate, keywords, youtubeVideoId } = body;

	if (!youtubeVideoId || !title || !sermonDate) {
		return NextResponse.json(
			{
				error: "Missing required fields: title, sermonDate, or youtubeVideoId.",
			},
			{ status: 400 },
		);
	}

	// --- Operational Guidance for User ---
	// In a real scenario, this function would either:
	// 1. Directly interact with the Strapi Content API using service credentials.
	// 2. Write the data to a queue that Strapi monitors for ingestion.

	console.log(`[ARCHIVE INGESTION] Received new sermon data for: ${title}`);
	console.log(`\tYoutube Video ID: ${youtubeVideoId}`);
	console.log(`\tDate: ${sermonDate}`);
	console.log(`\tKeywords: ${keywords.join(", ")}`);

	// Simulation of successful data save to Strapi backend
	const newSermonRecord = {
		success: true,
		message: "Sermon metadata successfully simulated for record.",
		record: {
			title,
			sermonDate,
			keywords: keywords.join(","), // Strapi fields often prefer comma-separated strings
			youtubeVideoId: youtubeVideoId,
		},
	};

	return NextResponse.json(newSermonRecord, { status: 201 });
}
