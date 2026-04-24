import React, { useEffect, useRef } from "react";
import styles from "./Overlay.module.css";

interface OverlayProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	ariaLabel?: string;
}

export default function Overlay({
	isOpen,
	onClose,
	children,
	ariaLabel,
}: OverlayProps) {
	const overlayRef = useRef<HTMLDivElement>(null);

	// Close on Escape key
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	// Focus trap
	useEffect(() => {
		if (!isOpen) return;
		const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		focusable?.[0]?.focus();
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className={styles.overlayBackdrop}
			onClick={onClose}
			aria-modal="true"
			role="dialog"
			aria-label={ariaLabel || "Dialog"}
		>
			<div
				className={styles.overlayContent}
				ref={overlayRef}
				onClick={(e) => e.stopPropagation()}
				tabIndex={-1}
			>
				{children}
			</div>
		</div>
	);
}
