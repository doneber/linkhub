import { useEffect, useState } from "preact/hooks"
import type { Resource } from "@src/interfaces/resource.interface"
import { Card } from "./card/Card"

export const ResourcesContainer = () => {
  const [resources, setResources] = useState<Resource[]>([])

	useEffect(() => {
		 function callResources() {
			fetch("/api/resources.json").then(data => data.json())
			.then(json => setResources(json.resources))
		}
		callResources()
	}, [])

  return (
    <ul role="list" class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      {resources.map((resource) => (
        <Card
          href={resource.url}
          title={resource.title}
          description={resource.description}
          // imageUrl={resource.imageUrl}
          hashtags={resource.hashtags}
        />
      ))}
    </ul>
  )
}
