import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.heroSection}>
				<div className={styles.heroText}>
					<h1 className={styles.heroTitle}>
						Faithful Community, Live Together
					</h1>
					<p className={styles.heroSubtitle}>
						Welcome to Park City Baptist Church. We are a community of believers
						dedicated to spreading the Gospel of Jesus Christ and growing in
						faith together as one family.
					</p>
					<div className={styles.serviceTime}>
						<ul className={styles.serviceList}>
							<li>
								<strong>Sunday School:</strong> 10:00 AM Central Time
							</li>
							<li>
								<strong>Worship Service:</strong> 11:00 AM Central Time
							</li>
						</ul>
					</div>
					<div className={styles.heroActions}>
						<a href="/events" className={styles.ctaButton}>
							Upcoming Events
						</a>
						<a href="/" className={styles.ctaButtonSecondary}>
							Watch Live
						</a>
					</div>
				</div>
				<div className={styles.heroImageWrapper}>
					<Image
						src="/church.avif"
						alt="Exterior of Park City Baptist Church sanctuary"
						width={400}
						height={300}
						className={styles.heroImage}
						priority
					/>
				</div>
			</section>
			<section className={styles.aboutSection}>
				<h2>Worship Services & Fellowship</h2>
				<p>
					Experience a reverent and warm community at Park City Baptist Church.
					Our services focus on biblical teaching, artisanal worship, and the
					spreading of the Gospel. Whether you are a lifelong believer or just
					beginning your journey, expect a serene environment where faith and
					fellowship meet naturally.
				</p>
			</section>
		</main>
	);
}
