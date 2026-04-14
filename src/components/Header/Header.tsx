"use client";
import { useState } from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import Navbar from "./Navbar/Navbar";

function Header() {
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<header className={styles.header}>
			<Logo />
			<button
				className={styles.hamburger}
				aria-label={
					mobileNavOpen ? "Close navigation menu" : "Open navigation menu"
				}
				aria-expanded={mobileNavOpen}
				aria-controls="main-navigation"
				onClick={() => setMobileNavOpen((open) => !open)}
			>
				<span className={styles.hamburgerBar}></span>
				<span className={styles.hamburgerBar}></span>
				<span className={styles.hamburgerBar}></span>
			</button>
			<Navbar
				mobileNavOpen={mobileNavOpen}
				closeMobileNav={() => setMobileNavOpen(false)}
			/>
			{/* Overlay for mobile nav */}
			{mobileNavOpen && (
				<div
					className={styles.overlay}
					onClick={() => setMobileNavOpen(false)}
					aria-hidden="true"
				></div>
			)}
		</header>
	);
}

export default Header;
