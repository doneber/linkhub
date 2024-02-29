import type { Resource } from "../../interfaces/resource.interface.js";
import { searchResults } from "../../store.js";
import { useState } from "preact/hooks";

export const SearchResults = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  searchResults.subscribe((result) => {
    setResources(result as Resource[  ]);
  });

  return (
    <div>
      <h4>Resultados:</h4>
      {resources.map  && resources.map((resource) => <h1>{resource.title}</h1>)}
    </div>
  );
};
