"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div>
			<h2>Something went wrong loading events!</h2>
			<pre>{error.message}</pre>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
