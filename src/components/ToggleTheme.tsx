import { useEffect, useState } from "preact/hooks";


export default function ToggleTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

useEffect(() => {
	if (theme === "dark") {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
	localStorage.setItem("theme", theme);
}, [theme]);

return (
	<button className="rounded-full border p-1 dark:border-neutral-700" onClick={handleClick}>{theme === "light" ? "🌙" : "🌞"}</button>
);
}