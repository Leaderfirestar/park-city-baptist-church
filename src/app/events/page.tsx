import { EventCard } from "../../components/EventCard/EventCard";
import { mockEvents } from "../../data/mockEvents";
import styles from "./page.module.css";

// Filter for upcoming events only (date >= today)
const today = new Date();
const upcomingEvents = mockEvents
	.filter((event) => new Date(event.date) >= today)
	.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const EventsPage = () => {
	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>Upcoming Events</h1>
			<div className={styles.eventsGrid}>
				{upcomingEvents.length === 0 ? (
					<div className={styles.noEvents}>
						No upcoming events at this time.
					</div>
				) : (
					upcomingEvents.map((event) => <EventCard key={event.id} {...event} />)
				)}
			</div>
		</main>
	);
};

export default EventsPage;
