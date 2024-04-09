import { useStore } from "@nanostores/preact"
import type { Resource } from "@src/interfaces/resource.interface.ts"
import { fetchResources } from "@src/services/resources.ts"
import { filtersResources } from "@src/store.ts"
import { useEffect, useState } from "preact/hooks"
import { ResourcesList } from "@components/ResourcesList.tsx"

export const SearchResults = () => {
	const [resources, setResources] = useState<Resource[]>([])
	const [isLoading, setIsloading] = useState(false)
	const [offset, setOffset] = useState(0)
	const [isThereMorePages, setIsThereMorePages] = useState(true)
	const limit = 5

	const filters = useStore(filtersResources)

	const getResources = ({ query, tags, offset, limit }: { query: string; tags: string[]; offset: number; limit: number }) => {
		const tagsJoined = tags.join(",")
		setIsloading(true)
		fetchResources({ query, limit, offset, tags: tagsJoined })
		.then(res => {
			setResources(prev => prev.concat(res.data))
			if ((offset + limit) >= res.info.total) {
				setIsThereMorePages(false)
			}
		}).finally(() => {
			setIsloading(false)
		})
	}

	useEffect(() => {
		setResources([]) // clean the resource state
		getResources({
			query: filters.query,
			tags: filters.tags,
			offset,
			limit
		})
	}, [filters])

	const handleNextPagination = () => {
		getResources({
			query: filters.query,
			tags: filters.tags,
			offset: offset + limit,
			limit
		})
		setOffset((prevOffset) => prevOffset + limit)
	}

	return (
		<div>
			<h4 className="my-5 text-base">Resultados:</h4>
			<ResourcesList
				resources={resources}
				isLoading={isLoading}
				handleNextPagination={handleNextPagination}
				isThereMorePages={isThereMorePages}
			/>
		</div>
	)
}
