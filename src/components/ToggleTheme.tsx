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
	<button onClick={handleClick}>
		<svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" data-astro-cid-oemx5le4=""><path fill="currentColor" d="M8,256C8,393,119,504,256,504S504,393,504,256,393,8,256,8,8,119,8,256ZM256,440V72a184,184,0,0,1,0,368Z" transform="translate(-8 -8)" data-astro-cid-oemx5le4=""></path></svg>
	</button>
);
}