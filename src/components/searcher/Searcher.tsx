import { filtersResources } from "@src/store"
import { useEffect, useRef } from "preact/hooks"
import { SearchIcon } from "./SearchIcon"

export const Searcher = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearch = async (event: SubmitEvent) => {
		event.preventDefault()
		filtersResources.set({
			query: inputRef.current?.value ?? "",
			tags: []
		})
	}

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		inputRef.current!.value = urlSearchParams.get("q") ?? ""

		filtersResources.set({
			query: inputRef.current?.value ?? "",
			tags: []
		})
	}, [])

	return (
		<form method="GET" autocomplete="off" action="/search" className="flex justify-center items-center gap-2" onSubmit={handleSearch}>
			<input ref={inputRef} required placeholder="Ej. svg" name="q" className="h-10 w-full rounded-lg border border-solid border-neutral-300 bg-transparent px-4 py-1 focus:border-neutral-500 focus:outline-none focus:ring-0 dark:border-neutral-700 dark:focus:border-neutral-500" />
			<button type={"submit"} className="rounded-lg px-2 pb-0 pt-2 hover:bg-neutral-200 dark:hover:bg-[#333]">
				<SearchIcon />
			</button>
		</form>
	)
}
