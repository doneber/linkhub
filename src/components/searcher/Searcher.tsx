import { filtersResources } from "@src/store"
import { useEffect, useRef } from "preact/hooks"
import { navigate } from "astro:transitions/client"
import { SearchIcon } from "./SearchIcon"

export const Searcher = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearch = async (event: SubmitEvent) => {
		event.preventDefault()

		const query = inputRef.current?.value ?? ""
		const hashtagsOfQuery: string[] = query.match(/#(\w+)/g) ?? []
		const tagsOfQuery = hashtagsOfQuery.map(tag => tag.substring(1))
		filtersResources.set({
			query,
			tags: tagsOfQuery,
		})

		const urlSearchParams = new URLSearchParams()
		urlSearchParams.append("q", query)

		tagsOfQuery.forEach(tag => {
			urlSearchParams.append("tags", tag)
		})

		navigate(`/search?${urlSearchParams.toString()}`)
	}

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		const query = urlSearchParams.get("q")?.trim() ?? ""
		const tags: string[] = urlSearchParams.getAll("tags")

		inputRef.current!.value = query

		const hashtagsOfQuery = query.match(/#(\w+)/g) ?? []

		const tagsOfQuery = hashtagsOfQuery.map(hashtag => hashtag.substring(1))

		const uniqueTags = [...new Set(tags.concat(tagsOfQuery))]
		filtersResources.set({
			query,
			tags: uniqueTags
		})
	}, [])

	return (
		<form autocomplete="off" className="flex justify-center items-center gap-2" onSubmit={handleSearch}>
			<input ref={inputRef} required placeholder="Ej. svg" name="q" className="h-10 w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-1 focus:border-neutral-500 focus:outline-none focus:ring-0 dark:border-neutral-700 dark:focus:border-neutral-500" />
			<button type={"submit"} className="rounded-lg px-2 pb-0 pt-2 hover:bg-neutral-200 dark:hover:bg-[#333]">
				<SearchIcon />
			</button>
		</form>
	)
}
