import type { Resource } from "./../interfaces/resource.interface";
import { useEffect, useState } from "preact/hooks";
import { Card } from './card/Card'
import { fetchResources } from "../utils";

export const ResourcesContainer = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    fetchResources().then(
      (data) => {
        setResources(data.resources);
      }
    );
  }, []);

  return (
    <ul role="list" class="link-card-grid">
      {resources.map((resource) => (
        <Card
          href={resource.url}
          title={resource.title}
          description={resource.description}
          imageUrl={resource.imageUrl}
        />
      ))}
    </ul>
  );
};
