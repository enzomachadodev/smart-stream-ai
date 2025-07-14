import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Toggle } from "./ui/toggle";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	const { theme } = useTheme();

	function toggleTheme() {
		setTheme(theme === "dark" ? "light" : "dark");
	}

	return (
		<div className="fixed bottom-20 right-5 z-50">
			<Toggle
				className="group border border-foreground data-[state=on]:hover:bg-muted rounded-full size-9 data-[state=on]:bg-transparent"
				onPressedChange={toggleTheme}
				aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
			>
				<MoonIcon
					size={16}
					className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
					aria-hidden="true"
				/>
				<SunIcon
					size={16}
					className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
					aria-hidden="true"
				/>
			</Toggle>
		</div>
	);
}
