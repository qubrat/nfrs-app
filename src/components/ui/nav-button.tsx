import { IconButton } from "@mui/joy";
import { Icon } from "@iconify/react";
import React from "react";
import styles from "@/styles/root";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
	icon: string;
	href: string;
	variant?: "solid" | "soft" | "plain";
	color?: "primary" | "neutral";
}

const NavButton = ({ icon, href, variant = "soft", color = "primary" }: NavButtonProps) => {
	const pathname = usePathname();

	const buttonStyles = {
		soft: {
			default: { ...styles.transition },
			active: { border: "1px solid", borderColor: `${color}.soft.Color`, ...styles.transition },
		},
	};

	return (
		<Link href={href}>
			<IconButton
				color={color}
				variant={variant === "plain" ? (pathname === href ? "outlined" : variant) : variant}
				sx={pathname === href && variant === "soft" ? buttonStyles.soft.active : buttonStyles.soft.default}
			>
				<Icon icon={icon} />
			</IconButton>
		</Link>
	);
};

export default NavButton;