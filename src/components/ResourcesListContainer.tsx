import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"
import { useEffect, useState } from "preact/hooks"
import { Card } from "./card/Card"

export const ResourcesContainer = () => {
	const [resources, setResources] = useState<Resource[]>([])
	const [offset, setOffset] = useState(0)
	const limit = 10

	const handlePagination = () => {
		setOffset(prev => {
			callResources({ limit, offset: prev + limit })
			return prev + limit
		})
	}

	function callResources({
		limit = 10,
		offset = 0
	}) {
		// todo: llevar a una función
		fetch(`/api/resources.json?limit=${limit}&offset=${offset}`).then(data => data.json())
			.then((json: ResponseFormat<Resource[]>) => setResources(prev => prev.concat(json.data)))
	}

	useEffect(() => {
		callResources({ limit, offset })
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
			<div className="flex justify-center my-4">
				<button onClick={handlePagination} className="py-2 px-4 rounded border-[1px] border-[solid] border-neutral-700 hover:bg-neutral-800 hover:bg-[0] dark:hover:bg-neutral-100 dark:border-neutral-200 ">Ver mas</button>
			</div>
		</>
	)
}
