import type { Resource } from "@src/interfaces/resource.interface"
import { fetchResources } from "@src/services/resources"
import { useEffect, useState } from "preact/hooks"
import { ResourcesList } from "./ResourcesList"

export const ResourcesContainer = () => {
	const [isLoading, setIsloading] = useState(false)
	const [resources, setResources] = useState<Resource[]>([])
	const [offset, setOffset] = useState(0)
	const limit = 10

	const handleNextPagination = () => {
		setOffset((prevOffset) => {
			setIsloading(true)
			const newOffset = prevOffset + limit
			fetchResources({ limit, offset: newOffset }).then(data => {
				setResources(prev => prev.concat(data))
			}).finally(() => {
				setIsloading(false)
			})
			return newOffset
		})
	}

	useEffect(() => {
		setIsloading(true)
		fetchResources({ limit, offset }).then(data => {
			setResources(prev => prev.concat(data))
		}).finally(() => {
			setIsloading(false)
		})
	}, [])

	return (
		<ResourcesList resources={resources} isLoading={isLoading} handleNextPagination={handleNextPagination} />
	)
}
