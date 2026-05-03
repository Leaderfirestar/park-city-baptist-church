import { getSermons } from "@/lib/queries/sermons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const page = searchParams.get("page")
		? Number(searchParams.get("page"))
		: undefined;
	const pageSize = searchParams.get("pageSize")
		? Number(searchParams.get("pageSize"))
		: undefined;
	const dateFrom = searchParams.get("dateFrom") ?? undefined;
	const dateTo = searchParams.get("dateTo") ?? undefined;
	const isLivestreamParam = searchParams.get("isLivestream");
	const isLivestream =
		isLivestreamParam === "true"
			? true
			: isLivestreamParam === "false"
				? false
				: undefined;

	try {
		const result = await getSermons({
			page,
			pageSize,
			dateFrom,
			dateTo,
			isLivestream,
		});
		return NextResponse.json(result);
	} catch (err) {
		console.error(
			"[GET /api/sermon] Error:",
			err instanceof Error ? err.message : JSON.stringify(err, null, 4),
		);
		return NextResponse.json(
			{
				error: err instanceof Error ? err.message : "Failed to fetch sermons.",
			},
			{ status: 500 },
		);
	}
}
