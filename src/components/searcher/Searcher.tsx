import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"
import { resources } from "@src/store"
import { useEffect, useRef } from "preact/hooks"
import { SearchIcon } from "./SearchIcon"

export const Searcher = () => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSearch = async () => {
		const response = await fetch(`/api/resources.json?q=${encodeURIComponent(inputRef.current?.value ?? "")}`)
		const data: ResponseFormat<Resource[]> = await response.json()
		resources.set(data.data)
	}

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		inputRef.current!.value = urlSearchParams.get("q") ?? ""

		handleSearch()
	}, [])

	return (
		<form method="GET" autocomplete="off" action="/search" className="flex justify-center items-center gap-2" onSubmit={handleSearch}>
			<input ref={inputRef} required placeholder="Ej. svg" name="q" className="h-10 w-full rounded-lg border border-solid border-neutral-700 bg-transparent px-4 py-1 focus:outline-none focus:ring-0 focus:border-neutral-500 dark:focus:border-neutral-500 dark:border-neutral-300" />
			<button type={"submit"} className="pt-2 pb-0 px-2 rounded-lg hover:bg-[#333] dark:hover:bg-neutral-200">
				<SearchIcon />
			</button>
		</form>
	)
}
