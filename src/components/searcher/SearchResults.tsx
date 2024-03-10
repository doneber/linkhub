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
      <ul className="flex flex-col gap-4 p-0 my-4">
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
