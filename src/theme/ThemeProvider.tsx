"use client";
import { createContext, useContext, ReactNode } from "react";

// Define the theme shape
const theme = {
	colors: {
		background: "var(--background)",
		foreground: "var(--foreground)",
		primary: "#2a7cff",
		primaryHover: "#1a5fcc",
		secondary: "#f2f2f2",
		border: "#ebebeb",
		textPrimary: "#1a2e1a",
		textSecondary: "#666",
		accent: "#ffb300",
		error: "#e53935",
		success: "#43a047",
	},
	borderRadius: {
		sm: "4px",
		md: "8px",
		lg: "16px",
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "32px",
		xl: "64px",
	},
	safeArea: {
		top: "env(safe-area-inset-top)",
		right: "env(safe-area-inset-right)",
		bottom: "env(safe-area-inset-bottom)",
		left: "env(safe-area-inset-left)",
	},
};

const ThemeContext = createContext(theme);

export function ThemeProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
