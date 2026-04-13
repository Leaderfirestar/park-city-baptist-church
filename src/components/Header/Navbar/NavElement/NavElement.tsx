import styles from "./NavElement.module.css";

interface Props {
	buttonText: string;
	href: string;
	isActive?: boolean;
	onClick?: () => void;
}

function NavElement({ buttonText, href, isActive, onClick }: Props) {
	return (
		<a
			href={href}
			className={
				isActive ? `${styles.navElement} ${styles.active}` : styles.navElement
			}
			aria-current={isActive ? "page" : undefined}
			tabIndex={0}
			onClick={onClick}
		>
			{buttonText}
		</a>
	);
}

export default NavElement;
