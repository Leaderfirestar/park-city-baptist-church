"use client";
// import { EventCard as SermonCard } from '@/components/EventCard/EventCard';
import { useMemo, useState } from "react";
import Overlay from "@/components/Overlay/Overlay";
import { mockSermons } from "@/data/mockSermons";
import styles from "./SermonList.module.css";

function LivestreamBanner({ url }: { url: string }) {
	const getYoutubeId = (url: string) => {
		const match = url.match(
			/(?:youtu.be\/|v=|embed\/|\/v\/|watch\?v=|\&v=)([\w-]{11})/,
		);
		return match ? match[1] : "";
	};
	const videoId = getYoutubeId(url);
	return (
		<div className={styles.livestreamBanner}>
			<h3 className={styles.livestreamTitle}>Live Now</h3>
			<div className={styles.livestreamVideoWrapper}>
				<iframe
					className={styles.livestreamIframe}
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					title="Livestream"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
				{/* autoplay; */}
			</div>
		</div>
	);
}

export default function SermonListContent() {
	// Multi-field filter state
	const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filterOpen, setFilterOpen] = useState(false);
	const [sortOpen, setSortOpen] = useState(false);
	const [sortOption, setSortOption] = useState<
		"newest" | "oldest" | "title-az" | "title-za" | "speaker-az"
	>("newest");
	const [pendingSort, setPendingSort] = useState(sortOption);

	// All unique speakers and tags
	const allSpeakers = useMemo(() => {
		const speakers = new Set<string>();
		mockSermons.forEach((s) => s.speaker && speakers.add(s.speaker));
		return Array.from(speakers).sort();
	}, []);
	const allTags = useMemo(() => {
		const tags = new Set<string>();
		mockSermons.forEach((s) => s.tags?.forEach((t) => tags.add(t)));
		return Array.from(tags).sort();
	}, []);

	// Filtering logic
	const filteredSermons = useMemo(() => {
		return mockSermons.filter((sermon) => {
			// Speaker filter
			if (
				selectedSpeakers.length > 0 &&
				!selectedSpeakers.includes(sermon.speaker)
			) {
				return false;
			}
			// Tag filter (all selected tags must be present)
			if (
				selectedTags.length > 0 &&
				!selectedTags.every((tag) => sermon.tags.includes(tag))
			) {
				return false;
			}
			return true;
		});
	}, [selectedSpeakers, selectedTags]);

	// Sorting logic
	const sortedSermons = useMemo(() => {
		const arr = [...filteredSermons];
		switch (sortOption) {
			case "oldest":
				arr.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				);
				break;
			case "title-az":
				arr.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "title-za":
				arr.sort((a, b) => b.title.localeCompare(a.title));
				break;
			case "speaker-az":
				arr.sort((a, b) => a.speaker.localeCompare(b.speaker));
				break;
			case "newest":
			default:
				arr.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);
		}
		return arr;
	}, [filteredSermons, sortOption]);

	const livestream = sortedSermons.find(
		(s) => s.isLivestream && s.livestreamUrl,
	);

	// Remove livestream from the list for rendering, will be shown as first item
	const sermonsWithoutLivestream = sortedSermons.filter(
		(s) => !(s.isLivestream && s.livestreamUrl),
	);

	// Handlers for filter selection
	const toggleSpeaker = (speaker: string) => {
		setSelectedSpeakers((prev) =>
			prev.includes(speaker)
				? prev.filter((s) => s !== speaker)
				: [...prev, speaker],
		);
	};
	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	};
	const clearFilters = () => {
		setSelectedSpeakers([]);
		setSelectedTags([]);
	};

	return (
		<div className={styles.sermonListContainer}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<main className={styles.sermonListMain}>
					<div className={styles.sermonListHeader}>
						<h1 className={styles.mainTitle}>Sermons</h1>
						<div className={styles.actionButtonsRow}>
							<button
								className={styles.filterButton}
								onClick={() => setFilterOpen(true)}
								aria-label="Open filters"
								style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M4 5h16M7 10h10M10 15h4"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							<button
								className={styles.sortButton}
								onClick={() => {
									setPendingSort(sortOption);
									setSortOpen(true);
								}}
								aria-label="Sort sermons"
								style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
							>
								<svg
									width="22"
									height="22"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M6 9l6 6 6-6"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<Overlay
							isOpen={filterOpen}
							onClose={() => setFilterOpen(false)}
							ariaLabel="Filter Sermons"
						>
							<h2 className={styles.sidebarTitle}>Filter Sermons</h2>
							<div className={styles.sidebarSection}>
								<label className={styles.sidebarLabel}>Speaker</label>
								<div className={styles.sidebarMultiselect}>
									{allSpeakers.map((speaker) => (
										<button
											key={speaker}
											className={
												styles.sidebarMultiselectBtn +
												(selectedSpeakers.includes(speaker)
													? " " + styles.selected
													: "")
											}
											type="button"
											onClick={() => toggleSpeaker(speaker)}
											aria-pressed={selectedSpeakers.includes(speaker)}
										>
											{speaker}
										</button>
									))}
								</div>
							</div>
							<div className={styles.sidebarSection}>
								<label className={styles.sidebarLabel}>Tags</label>
								<div className={styles.sidebarMultiselect}>
									{allTags.map((tag) => (
										<button
											key={tag}
											className={
												styles.sidebarMultiselectBtn +
												(selectedTags.includes(tag)
													? " " + styles.selected
													: "")
											}
											type="button"
											onClick={() => toggleTag(tag)}
											aria-pressed={selectedTags.includes(tag)}
										>
											{tag}
										</button>
									))}
								</div>
							</div>
							<button
								className={styles.filterModalCloseBtn}
								onClick={() => setFilterOpen(false)}
								aria-label="Close filter modal"
							>
								×
							</button>
							<div
								style={{
									display: "flex",
									gap: "1rem",
									marginTop: "1.5rem",
									justifyContent: "flex-end",
								}}
							>
								<button
									className={styles.filterModalClearBtn}
									onClick={clearFilters}
								>
									Clear All
								</button>
								<button
									className={styles.filterModalApplyBtn}
									onClick={() => setFilterOpen(false)}
								>
									Apply
								</button>
							</div>
						</Overlay>
						<Overlay
							isOpen={sortOpen}
							onClose={() => setSortOpen(false)}
							ariaLabel="Sort Sermons"
						>
							<h2 className={styles.sidebarTitle}>Sort Sermons</h2>
							<div
								className={styles.sortMenu}
								style={{ marginBottom: "1.5rem" }}
							>
								<button
									className={styles.sortMenuItem}
									onClick={() => setPendingSort("newest")}
									aria-pressed={pendingSort === "newest"}
								>
									Newest to Oldest
								</button>
								<button
									className={styles.sortMenuItem}
									onClick={() => setPendingSort("oldest")}
									aria-pressed={pendingSort === "oldest"}
								>
									Oldest to Newest
								</button>
								<button
									className={styles.sortMenuItem}
									onClick={() => setPendingSort("title-az")}
									aria-pressed={pendingSort === "title-az"}
								>
									Title A–Z
								</button>
								<button
									className={styles.sortMenuItem}
									onClick={() => setPendingSort("title-za")}
									aria-pressed={pendingSort === "title-za"}
								>
									Title Z–A
								</button>
								<button
									className={styles.sortMenuItem}
									onClick={() => setPendingSort("speaker-az")}
									aria-pressed={pendingSort === "speaker-az"}
								>
									Speaker A–Z
								</button>
							</div>
							<button
								className={styles.filterModalCloseBtn}
								onClick={() => setSortOpen(false)}
								aria-label="Close sort modal"
							>
								×
							</button>
							<div
								style={{
									display: "flex",
									gap: "1rem",
									justifyContent: "flex-end",
								}}
							>
								<button
									className={styles.filterModalApplyBtn}
									onClick={() => {
										setSortOption(pendingSort);
										setSortOpen(false);
									}}
								>
									Apply
								</button>
							</div>
						</Overlay>
					</div>

					<div
						className={styles.sermonListGrid}
						style={{ gridTemplateColumns: "1fr" }}
					>
						{livestream && livestream.livestreamUrl && (
							<div key="livestream" style={{ width: "100%" }}>
								<LivestreamBanner url={livestream.livestreamUrl} />
							</div>
						)}
						{sermonsWithoutLivestream.length === 0 ? (
							<div className={styles.noSermonsAlert}>
								<h3 className={styles.noSermonsTitle}>No sermons found.</h3>
							</div>
						) : (
							sermonsWithoutLivestream.map((sermon) => (
								<div
									key={sermon.id}
									className={styles.sermonListItem}
									style={{
										width: "100%",
										marginBottom: "2rem",
										textAlign: "left",
									}}
								>
									<h2
										style={{
											fontSize: "1.5rem",
											fontWeight: 700,
											marginBottom: "0.25em",
										}}
									>
										{sermon.livestreamUrl || sermon.recordingUrl ? (
											<a
												href={sermon.livestreamUrl || sermon.recordingUrl}
												target="_blank"
												rel="noopener noreferrer"
												style={{
													color: "var(--accent)",
													textDecoration: "underline",
												}}
											>
												{sermon.title}
											</a>
										) : (
											<span>{sermon.title}</span>
										)}
									</h2>
									<div
										style={{
											color: "#666",
											fontSize: "1rem",
											marginBottom: "0.5em",
										}}
									>
										{new Date(sermon.date).toLocaleDateString(undefined, {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</div>
									<div style={{ marginBottom: "0.5em" }}>
										{sermon.description}
									</div>
								</div>
							))
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
