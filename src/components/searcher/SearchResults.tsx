import type { Resource } from "@src/interfaces/resource.interface.ts"
import { resources } from "@src/store.ts"
import { useState } from "preact/hooks"
import { ResourcesList } from "../ResourcesList.tsx"

export const SearchResults = () => {
	const [results, setResults] = useState<Resource[]>([])
	const [isLoading, setIsloading] = useState(false)

	setResults(resources.get())

	resources.subscribe((data: any) => {
		setResults(data)
	})

	const handleNextPagination = () => {

	}

	return (

		<div>
			<h4 className="my-5 text-base">Resultados:</h4>
			<ResourcesList resources={results} isLoading={isLoading} handleNextPagination={handleNextPagination} />
		</div>
	)
}
