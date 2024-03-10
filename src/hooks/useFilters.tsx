import type { Filter } from "@src/interfaces/filter.interface"
import type { Resource } from "@src/interfaces/resource.interface"
import { searchResults } from "@src/store"
import { levenshteinDistance } from "@utils/utils.ts"
import { useState } from "preact/hooks"

export function useFilters() {
	const [filters, setFilters] = useState<Filter>({
		query: "",
		tags: []
	})

	const filterResources = (resources: Resource[]) => {
		// TODO: Refactor

		const resourcesMatched = resources.filter((resource) => {
      return levenshteinDistance(resource.title.toLocaleLowerCase(), filters.query.toLocaleLowerCase()) <= 2
    })
		searchResults.set(resourcesMatched) // eyes
		return resourcesMatched
	}

	return { setFilters, filterResources }
}