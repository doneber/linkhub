import { useFilters } from "@src/hooks/useFilters"
import { fetchResources } from "@utils/utils.ts"
import { useEffect, useRef, useState } from "preact/hooks"

// TODO: Modularizar los recursos
async function getResourcesInit() {
	const data = await fetchResources()
	return data.resources
}

const resources = await getResourcesInit()

export const Searcher = () => {
	const { setFilters, filterResources } = useFilters()
	const [query, setQuery] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
		setQuery(inputRef.current!.value)
		setFilters(prev => {
			return {
				...prev,
				query
			}
		})
  }

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		inputRef.current!.value = urlSearchParams.get("q") ?? ""

		setQuery(inputRef.current!.value)
		setFilters(prev => {
			return {
				...prev,
				query
			}
		})
	}, [])

	useEffect(() => {
		filterResources(resources)
	}, [query])

  return (
    <form className="flex justify-center items-center gap-2" onSubmit={handleSearch}>
      <input ref={inputRef} required name="q" className="border rounded-lg border-solid bg-[#191919] border-[#333] w-full h-10 max-w-[520px] px-4 py-1" />
      <button type={"submit"} className="pt-2 pb-0 px-2 rounded-lg hover:bg-[#333]">
        <svg
          width="30"
          fill="#fff"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </button>
    </form>
  )
}
