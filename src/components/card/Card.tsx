import { useState } from "preact/hooks"
import { useBookmark } from "../../hooks/useBookmark"

interface Props {
	title: string
	description: string
	href: string
	imageUrl?: string | undefined
	hashtags: string[]
}

export const Card = ({ href, title, description, imageUrl, hashtags }: Props) => {
	const { getBookmarks, addBookmark } = useBookmark()

	const checkMark = () => getBookmarks()
		.some(bookmark =>
			bookmark.url === href // resource.url es como una ID
		)
	const [isMarked, setIsMarked] = useState<boolean>(checkMark())

	const handleBookmark = (event: Event) => {
		event.preventDefault()
		addBookmark({ url: href, title, description, imageUrl, hashtags })
		setIsMarked(checkMark())
	}

	return (
		<li className="overflow-hidden rounded border-[1px] border-[solid] border-neutral-700 hover:bg-neutral-800 hover:bg-[0] dark:hover:bg-neutral-100 dark:border-neutral-200 ">
			<a href={href} target="_blank" className="flex h-full flex-col md:flex-row order-1 w-full">
				<div className="flex w-full h-full flex-col p-4">
					<h2 className="min-h-4 truncate">{title}</h2>
					<p className="mt-2 text-sm text-neutral-400 dark:text-neutral-800 overflow-hidden"
						style="
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								text-overflow: ellipsis;
							"
					>{description}</p>
					<ul className="mx-0 my-2 flex flex-wrap gap-1 p-0">
						{hashtags.map((hashtag) => (
							<li className="rounded-lg border-[1px] border-[solid] border-neutral-800 px-[6px] pb-[2px] pt-[1px] text-sm">{hashtag}</li>
						))}
					</ul>
					<p className="mt-auto truncate text-sm">{href}</p>
					<button className="mt-2 w-fit" onClick={handleBookmark}>
						<svg
							className={`hover:fill-neutral-200 ${isMarked ? "fill-neutral-200 dark:fill-neutral-950" : ""}`}
							width="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C6.52 3 7.08 3 8.2 3h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C19 4.52 19 5.08 19 6.2V21l-7-5-7 5V6.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
						</svg>
					</button>
				</div>
				{/* TODO: is la imagen da error, no mostrar */}
				{imageUrl && (
					<div className="group relative transition-all  ">
						<a
							className="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
							href={href}
							target="_blank"
							data-cropped="true"
						>
							<img
								className=" rounded-lg object-cover md:aspect-square group-hover:contrast-100 transition-all max-sm:aspect-video sm:w-[300px] md:w-[270px]"
								loading="lazy"
								src={imageUrl}
								alt={`Imagen de ${title}`}
							/>
							<img
								className="blur-md opacity-45 group-hover:opacity-90 absolute inset-0 transition-all contrast-150 -z-10 object-cover md:aspect-square sm:w-[300px] rounded-lg max-sm:aspect-video md:w-[270px]"
								loading="lazy"
								src={imageUrl}
								alt={`Imagen de ${title}`}
							/>
						</a>
					</div>
				)}
			</a>
		</li>
	)
}
