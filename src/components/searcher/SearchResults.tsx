import type { Resource } from "@src/interfaces/resource.interface.ts"
import { resources } from "@src/store.ts"
import { useState } from "preact/hooks"
import { Card } from "../card/Card.tsx"

export const SearchResults = () => {
	const [results, setResults] = useState<Resource[]>([])

	setResults(resources.get())

	resources.subscribe((data: any) => {
		setResults(data)
	})

	return (

		<div>
			<h4 className="my-5 text-base">Resultados:</h4>
			<ul className="grid grid-cols-1  gap-y-10 gap-x-6 items-start">
				{
					results.length === 0 ? <p>No se encontraron coincidencias</p> : results.map((resource) => (
						<Card
							href={resource.url}
							title={resource.title}
							description={resource.description ?? ""}
							imageUrl={resource.imageUrl}
							hashtags={resource.hashtags}
						/>
					))}
			</ul>
		</div>
	)
}
