"use client";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import NavElement from "./NavElement/NavElement";

interface Props {
	mobileNavOpen?: boolean;
	closeMobileNav?: () => void;
}

function Navbar({ mobileNavOpen = false, closeMobileNav }: Props) {
	const pathname = usePathname();

	const navLinks = [
		{ text: "Home", href: "/" },
		{ text: "Sermons", href: "/sermons" },
		{ text: "Events", href: "/events" },
		// { text: "Groups", href: "/groups" },
	];

	return (
		<nav
			className={`${styles.navWrapper} ${mobileNavOpen && styles.mobileOpen}`}
			id="main-navigation"
			aria-label="Main navigation"
		>
			{navLinks.map((link) => (
				<NavElement
					key={link.href}
					buttonText={link.text}
					href={link.href}
					isActive={pathname === link.href}
					onClick={closeMobileNav}
				/>
			))}
		</nav>
	);
}

export default Navbar;
