import { useEffect, useState } from "preact/hooks"
import { fetchResources } from "../utils"
import type { Resource } from "./../interfaces/resource.interface"
import { Card } from "./card/Card"

export const ResourcesContainer = () => {
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    fetchResources().then(
      (data) => {
        setResources(data.resources)
      }
    )
  }, [])

  return (
    <ul role="list" class="flex flex-col gap-4 p-0;">
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
