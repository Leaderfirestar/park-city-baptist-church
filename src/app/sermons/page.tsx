import SermonList from "@/components/SermonList/SermonList";
import styles from "./page.module.css";

export default function SermonsPage() {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<SermonList />
			</div>
		</div>
	);
}
