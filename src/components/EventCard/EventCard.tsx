"use client";
import React from "react";
import styles from "./EventCard.module.css";

interface EventCardProps {
	title: string;
	date: string;
	time: string;
	location: string;
	description: string;
	image?: string;
	tags: string[];
}

const fallbackImage = "/church.avif";

export const EventCard: React.FC<EventCardProps> = ({
	title,
	date,
	time,
	location,
	description,
	image,
	tags,
}) => {
	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<img
					src={image || fallbackImage}
					alt={title}
					className={styles.image}
					onError={(e) => (e.currentTarget.src = fallbackImage)}
				/>
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.datetime}>
						<span className={styles.date}>
							{new Date(date).toLocaleDateString(undefined, {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</span>
						<span className={styles.time}>{time}</span>
					</div>
				</div>
				<div className={styles.location}>{location}</div>
				<div className={styles.description}>{description}</div>
				<div className={styles.tags}>
					{tags.map((tag) => (
						<span className={styles.tag} key={tag}>
							{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
