import { useResources } from "@src/hooks/useResources"
import { Card } from "./card/Card"

export const ResourcesContainer = () => {
  const { resources } = useResources()

  return (
    <ul role="list" class="grid grid-cols-1 gap-3 ">
      {resources.map((resource) => (
        <Card
          href={resource.url}
          title={resource.title}
          description={resource.description}
          imageUrl={resource.imageUrl}
          hashtags={resource.hashtags}
		  
        />
      ))}
    </ul>
  )
}
