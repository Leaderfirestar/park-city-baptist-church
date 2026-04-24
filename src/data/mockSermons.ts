export interface MockSermon {
	id: number;
	title: string;
	date: string; // ISO string
	speaker: string;
	description: string;
	tags: string[];
	isLivestream?: boolean;
	livestreamUrl?: string;
	recordingUrl?: string;
}

export const mockSermons: MockSermon[] = [
	{
		id: 1,
		title: "The Good Shepherd",
		date: "2026-04-19T10:30:00Z",
		speaker: "Pastor John Smith",
		description: "Exploring Psalm 23 and the comfort of God's guidance.",
		tags: ["Psalm 23", "Comfort", "Guidance"],
		recordingUrl: "https://www.youtube.com/watch?v=example1",
	},
	{
		id: 2,
		title: "Faith Over Fear",
		date: "2026-04-12T10:30:00Z",
		speaker: "Rev. Mary Johnson",
		description: "How faith can overcome anxiety and uncertainty in our lives.",
		tags: ["Faith", "Courage"],
		recordingUrl: "https://www.youtube.com/watch?v=example2",
	},
	{
		id: 3,
		title: "Easter Sunday: He Is Risen!",
		date: "2026-04-05T10:30:00Z",
		speaker: "Pastor John Smith",
		description: "Celebrating the resurrection of Jesus Christ.",
		tags: ["Easter", "Resurrection"],
		recordingUrl: "https://www.youtube.com/watch?v=example3",
	},
	{
		id: 4,
		title: "Live: Midweek Worship",
		date: "2026-04-22T19:00:00Z",
		speaker: "Worship Team",
		description: "Join us for a special livestream worship experience.",
		tags: ["Livestream", "Worship"],
		isLivestream: true,
		livestreamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	},
];
