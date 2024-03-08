import { useState } from "preact/hooks"
import type { Resource } from "@interfaces/resource.interface.ts"
import { searchResults } from "@src/store.ts"
import { Card } from "../card/Card.tsx"

export const SearchResults = () => {
  const [resources, setResources] = useState<Resource[]>([])

  searchResults.subscribe((result) => {
    setResources(result as Resource[])
  })

  return (
    <div>
      <h4 className="font-bold my-5 text-xl">Resultados:</h4>
      <ul className="flex flex-col gap-4 p-0 my-4">
        {resources.map &&
          resources.map((resource) => (
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
