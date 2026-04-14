export interface Event {
	id: string;
	title: string;
	date: string; // ISO format
	time: string;
	location: string;
	description: string;
	image?: string;
	tags: string[];
}

// Only upcoming events (some with images, some without)
export const mockEvents: Event[] = [
	{
		id: "1",
		title: "Spring Community Picnic",
		date: "2026-05-10",
		time: "12:00 PM",
		location: "Central Park",
		description:
			"Join us for food, games, and fellowship at our annual spring picnic!",
		image: "/church.avif",
		tags: ["Family", "Outdoors", "Food"],
	},
	{
		id: "2",
		title: "Youth Group Movie Night",
		date: "2026-05-18",
		time: "6:30 PM",
		location: "Church Basement",
		description: "A fun night for teens with snacks and a movie.",
		tags: ["Youth", "Movie", "Snacks"],
	},
	{
		id: "3",
		title: "Bible Study: Book of John",
		date: "2026-06-01",
		time: "7:00 PM",
		location: "Room 101",
		description: "Weekly Bible study group, open to all ages.",
		image: "/church.avif",
		tags: ["Bible Study", "Adults", "Learning"],
	},
	{
		id: "4",
		title: "Vacation Bible School",
		date: "2026-07-15",
		time: "9:00 AM",
		location: "Church Grounds",
		description: "A week of fun, learning, and faith for kids ages 5-12.",
		tags: ["Kids", "Learning", "Summer"],
	},
];
