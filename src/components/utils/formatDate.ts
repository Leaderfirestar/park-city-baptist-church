/**
 * Formats an ISO date string into a readable format for display.
 * Assumes the dateString is in 'YYYY-MM-DD' format.
 * @param dateString Date string (e.g., "2026-04-13")
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
	if (!dateString) return "Date Unavailable";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
