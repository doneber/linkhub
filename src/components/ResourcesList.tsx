import type { Resource } from "@src/interfaces/resource.interface"
import { Card } from "./card/Card"

interface Props {
	resources: Resource[]
	isLoading: boolean
	handleNextPagination: () => void
}

export const ResourcesList = ({ resources, isLoading, handleNextPagination }: Props) => {
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
