import type { Resource } from "@src/interfaces/resource.interface"
import { bookmarks } from "../store"

export const useBookmark = () => {
	const getBookmarks = () => {
		return bookmarks.get()
	}

	const toggleBookmark = (resource: Resource) => {
		const indexResource = bookmarks.get()
		.find(resourceBookmark => resourceBookmark.url === resource.url)

		// resource.url es como una ID
		if (indexResource) {
			bookmarks.set(bookmarks.get()
			.filter(resourceBookmark => resourceBookmark.url !== resource.url))
		}
		else {
			bookmarks.set([...bookmarks.get(), resource])
		}
	}

	return { getBookmarks, addBookmark: toggleBookmark }
}