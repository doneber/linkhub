export const Tag = ({ text }: { text: string }) => {
	// TODO: Limpiar el "text" o codificarlo para poder pasarlo como query param en la url
	return (
		<a href={`/search?tags=${text}`} className="rounded-xl border-[1px] border-[solid] border-neutral-200 bg-neutral-100 px-3 pb-1 pt-0.5 text-sm hover:bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
			<span className="text-base">{text}</span>
		</a>
	)
}