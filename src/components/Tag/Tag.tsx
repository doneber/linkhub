export const Tag = ({ text }: { text: string }) => {
	// TODO: Limpiar el "text" o codificarlo para poder pasarlo como query param en la url
	return (
		<a href={`/search?q=%23${text}`} className="bg-neutral-800 rounded-xl border-[1px] border-[solid] border-neutral-800 text-sm pt-0.5 pb-1 px-3">
			<span className="text-base">{text}</span>
		</a>
	)
}