import type { Resource } from "@src/interfaces/resource.interface"
import { bookmarks } from "../store"

export const useBookmark = () => {
	// TODO: Optimizar la carga inicial del estado global, ya que se ejecuta una vez por cada resource
	const initBookmark: Resource[] = JSON.parse(window.localStorage.getItem("bookmarks") ?? "[]") || []
	bookmarks.set(initBookmark)

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
		window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks.get()))
	}

	return { getBookmarks, addBookmark: toggleBookmark }
}