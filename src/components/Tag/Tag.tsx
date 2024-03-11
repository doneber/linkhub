export const Tag = ({ text }: { text: string }) => {
	// TODO: Limpiar el "text" o codificarlo para poder pasarlo como query param en la url
	return (
		<a href={`/search?q=%23${text}`} className="rounded-xl border-[1px] border-[solid] border-neutral-800 bg-neutral-800 px-3 pb-1 pt-0.5 text-sm dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-950 dark:hover:bg-neutral-300">
			<span className="text-base">{text}</span>
		</a>
	)
}