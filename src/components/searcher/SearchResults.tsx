import type { Resource } from "../../interfaces/resource.interface.js";
import { searchResults } from "../../store.js";
import { useState } from "preact/hooks";
import { Card } from "../card/Card.jsx";

export const SearchResults = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  searchResults.subscribe((result) => {
    setResources(result as Resource[]);
  });

  return (
    <div>
      <h4>Resultados:</h4>
      <ul class="link-card-grid">
        {resources.map &&
          resources.map((resource) => (
            <Card
              href={resource.url}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.imageUrl}
            />
          ))}
      </ul>
    </div>
  );
};
