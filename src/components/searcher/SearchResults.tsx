import { useFilters } from "@src/hooks/useFilters.tsx"
import { useResources } from "@src/hooks/useResources.tsx"
import { Card } from "../card/Card.tsx"

export const SearchResults = () => {
	const { resources } = useResources()
	const { filterResources } = useFilters()
	const resourcesFiltered = filterResources(resources)

  return (

    <div>
      <h4 className="my-5 text-base">Resultados:</h4>
		  <ul className="grid grid-cols-1  gap-y-10 gap-x-6 items-start">
        {
          resourcesFiltered.length === 0 ? <p>No se encontraron coincidencias</p> : resourcesFiltered.map((resource) => (
            <Card
              href={resource.url}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.imageUrl}
              hashtags={resource.hashtags}
            />
          ))}
      </ul>
    </div>
  )
}
