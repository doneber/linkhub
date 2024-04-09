import type { Resource } from "@src/interfaces/resource.interface"
import { fetchResources } from "@src/services/resources"
import { useEffect, useState } from "preact/hooks"
import { ResourcesList } from "./ResourcesList"

export const ResourcesContainer = () => {
	const [isLoading, setIsloading] = useState(false)
	const [resources, setResources] = useState<Resource[]>([])
	const [offset, setOffset] = useState(0)
	const [isThereMorePages, setIsThereMorePages] = useState(true)
	const limit = 10

	const getResources = ({ offset, limit }: { offset: number; limit: number }) => {
		setIsloading(true)
		fetchResources({ limit, offset }).then(res => {
			setResources(prev => prev.concat(res.data))
			if ((offset + limit) >= res.info.total) {
				setIsThereMorePages(false)
			}
		}).finally(() => {
			setIsloading(false)
		})
	}

	const handleNextPagination = () => {
		getResources({ offset: offset + limit, limit })
		setOffset((prevOffset) => prevOffset + limit)
	}

	useEffect(() => {
		getResources({ offset, limit })
	}, [])

	return (
		<ResourcesList
			resources={resources}
			isLoading={isLoading}
			handleNextPagination={handleNextPagination}
			isThereMorePages={isThereMorePages}
		/>
	)
}
