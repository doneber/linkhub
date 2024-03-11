import { useFilters } from "@src/hooks/useFilters"
import { useEffect, useRef } from "preact/hooks"
import { SearchIcon } from "./SearchIcon"

export const Searcher = () => {
	const { setFilters } = useFilters()
	const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
	 	  setFilters({
			query: inputRef.current!.value,
			tags: []
		})
  }

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		inputRef.current!.value = urlSearchParams.get("q") ?? ""

		handleSearch()
	}, [])

  return (
    <form method="GET" action="/search" className="flex justify-center items-center gap-2" onSubmit={handleSearch}>
      <input ref={inputRef} required placeholder="Ej. svg" name="q" className="h-10 w-full rounded-lg border border-solid border-neutral-700 bg-transparent px-4 py-1 focus:outline-none focus:ring-0" />
      <button type={"submit"} className="pt-2 pb-0 px-2 rounded-lg hover:bg-[#333]">
        <SearchIcon />
      </button>
    </form>
  )
}
