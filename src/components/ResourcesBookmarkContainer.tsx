import { useBookmark } from "@src/hooks/useBookmark"
import { Card } from "./card/Card"

export const ResourcesBookmarkContainer = () => {
	const { getBookmarks } = useBookmark()

	return (
		<ul role="list" class="flex flex-col gap-4 p-0 my-4">
			{getBookmarks().length > 0 ? getBookmarks().map((resource) => (
				<Card
					href={resource.url}
					title={resource.title}
					description={resource.description ?? ""}
					imageUrl={resource.imageUrl}
					hashtags={resource.hashtags}
				/>
			)) :

				<p>
					Aún no hay nada guardado.
				</p>
			}
		</ul>
	)
}
