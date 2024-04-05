import { useStore } from "@nanostores/preact"
import type { Resource } from "@src/interfaces/resource.interface.ts"
import { fetchResources } from "@src/services/resources.ts"
import { filtersResources } from "@src/store.ts"
import { useEffect, useState } from "preact/hooks"
import { ResourcesList } from "../ResourcesList.tsx"

export const SearchResults = () => {
	const [resources, setResources] = useState<Resource[]>([])
	const [isLoading, setIsloading] = useState(false)
	const [offset, setOffset] = useState(0)
	const limit = 5

	const filters = useStore(filtersResources)

	useEffect(() => {
		setIsloading(true)
		const query = filters.query
		const tags = filters.tags.join() // eyes

		fetchResources({ query, limit, offset, tags })
		.then(data => {
			setResources(data)
		})
		.finally(() => {
			setIsloading(false)
		})
	}, [filters])

	const handleNextPagination = () => {
		setOffset((prevOffset) => {
			setIsloading(true)
			const newOffset = prevOffset + limit
			const query = filters.query
			const tags = filters.tags.join() // eyes

			fetchResources({ query, limit, offset: newOffset, tags })
			.then(data => { setResources(prev => prev.concat(data)) })
			.finally(() => { setIsloading(false) })
			return newOffset
		})
	}

	return (

		<div>
			<h4 className="my-5 text-base">Resultados:</h4>
			<ResourcesList resources={resources} isLoading={isLoading} handleNextPagination={handleNextPagination} />
		</div>
	)
}
