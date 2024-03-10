import type { Resource } from "@src/interfaces/resource.interface";
import { filtersResources } from "@src/store";
import { levenshteinDistance } from "@utils/utils.ts";

export function useFilters() {
	const filters = filtersResources.get()
	const setFilters = filtersResources.set

	const filterResources = (resources: Resource[]) => {
		// TODO: improve the searcher algorithm
		const query = filters.query.toLocaleLowerCase()
		return resources.filter((resource) => {
			const title = resource.title.toLocaleLowerCase()
      return levenshteinDistance(title, query) <= 3
    })
	}

	return { setFilters, filterResources }
}
