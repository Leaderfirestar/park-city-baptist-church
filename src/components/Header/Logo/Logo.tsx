import Image from "next/image";

function Logo() {
	return (
		<a href="/" aria-label="Home">
			<Image
				src="/logo.png"
				alt="Park City Baptist Church Logo"
				width={151}
				height={66}
			/>
		</a>
	);
}

export default Logo;
