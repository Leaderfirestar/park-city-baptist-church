"use client";
import Overlay from "@/components/Overlay/Overlay";
import type { Sermon, SermonQueryResult } from "@/lib/queries/sermons";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

async function fetchSermons(): Promise<SermonQueryResult> {
	const res = await fetch("/api/sermons");
	if (!res.ok) throw new Error("Failed to fetch sermons");
	return res.json();
}

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

export default function SermonsPage() {
	const { data, isLoading, isError } = useQuery<SermonQueryResult>({
		queryKey: ["sermons"],
		queryFn: fetchSermons,
	});

	const sermons: Sermon[] = data?.sermons ?? [];

	const [filterOpen, setFilterOpen] = useState(false);
	const [sortOpen, setSortOpen] = useState(false);
	const [sortOption, setSortOption] = useState<
		"newest" | "oldest" | "title-az" | "title-za"
	>("newest");
	const [pendingSort, setPendingSort] = useState(sortOption);

	// Sorting logic
	const sortedSermons = useMemo(() => {
		const arr = [...sermons];
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
			case "newest":
			default:
				arr.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);
		}
		return arr;
	}, [sermons, sortOption]);

	const livestream = sortedSermons.find((s) => s.is_live && s.url);
	const sermonsWithoutLivestream = sortedSermons.filter(
		(s) => !(s.is_live && s.url),
	);
	return (
		<main className={styles.container}>
			<div className={styles.sermonListHeader}>
				<h1 className={styles.mainTitle}>Sermons</h1>
				<div className={styles.actionButtonsRow}>
					<button
						className={styles.filterButton}
						onClick={() => setFilterOpen(true)}
						aria-label="Open filters"
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
					<button
						className={styles.filterModalCloseBtn}
						onClick={() => setFilterOpen(false)}
						aria-label="Close filter modal"
					>
						×
					</button>
					<div className={styles.filterActionContainer}>
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
					<div className={styles.sortMenu}>
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
					</div>
					<button
						className={styles.filterModalCloseBtn}
						onClick={() => setSortOpen(false)}
						aria-label="Close sort modal"
					>
						×
					</button>
					<div className={styles.filterActionContainer}>
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
				{livestream && livestream.url && (
					<LivestreamBanner url={livestream.url} />
				)}
				{isLoading && (
					<div className={styles.noSermonsAlert}>
						<h3 className={styles.noSermonsTitle}>Loading sermons…</h3>
					</div>
				)}
				{isError && (
					<div className={styles.noSermonsAlert}>
						<h3 className={styles.noSermonsTitle}>Failed to load sermons.</h3>
					</div>
				)}
				{!isLoading && !isError && sermonsWithoutLivestream.length === 0 ? (
					<div className={styles.noSermonsAlert}>
						<h3 className={styles.noSermonsTitle}>No sermons found.</h3>
					</div>
				) : (
					sermonsWithoutLivestream.map((sermon) => (
						<div key={sermon.id} className={styles.sermonListItem}>
							<h2
								style={{
									fontSize: "1.5rem",
									fontWeight: 700,
									marginBottom: "0.25em",
								}}
							>
								{sermon.url ? (
									<a
										href={sermon.url}
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
							<div style={{ marginBottom: "0.5em" }}>{sermon.description}</div>
						</div>
					))
				)}
			</div>
		</main>
	);
}
