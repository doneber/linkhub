import type { Resource } from "@src/interfaces/resource.interface"
import { fetchResources } from "@src/services/resources"
import { useEffect, useState } from "preact/hooks"
import { Card } from "./card/Card"

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
		<>
			<ul role="list" class="grid grid-cols-1 gap-3 ">
				{resources.map((resource) => (
					<Card
						href={resource.url}
						title={resource.title}
						description={resource.description ?? ""}
						imageUrl={resource.imageUrl}
						hashtags={resource.hashtags}

					/>
				))}
			</ul>
			{
				isLoading && <div className="text-base text-center">
					Cargando...
				</div>
			}
			<div className="flex justify-center my-4">
				<button onClick={handleNextPagination} className="py-2 px-4 rounded border-[1px] border-[solid] border-neutral-700 hover:bg-neutral-800 hover:bg-[0] dark:hover:bg-neutral-100 dark:border-neutral-200 ">Ver mas</button>
			</div>
		</>
	)
}
