import React from "react";
import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import SocialBar from "../SocialBar/SocialBar";

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<Logo />
				<div className={styles.footerInfo}>
					<SocialBar />
					<p className={styles.copyright}>
						&copy; {new Date().getFullYear()} PARK CITY BAPTIST CHURCH. FAITHFUL
						COMMUNITY, LIVE TOGETHER.
					</p>
					<p className={styles.copyright}>ALL RIGHTS RESERVED.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
