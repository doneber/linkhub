import type { Resource } from "@src/interfaces/resource.interface"
import { filtersResources } from "@src/store"
import Fuse from "fuse.js"

export function useFilters() {
	const filters = filtersResources.get()
	const setFilters = filtersResources.set

	const filterResources = (resources: Resource[]) => {
		const query = filters.query.toLocaleLowerCase()

		// TODO: Probar la mejor configuracion
		const fuseOptions = {
			isCaseSensitive: false,
			// includeScore: false,
			// shouldSort: true,
			// includeMatches: false,
			// findAllMatches: false,
			// minMatchCharLength: 1,
			// location: 0,
			// threshold: 0.6,
			// distance: 100,
			// useExtendedSearch: false,
			ignoreLocation: true,
			// ignoreFieldNorm: false,
			// fieldNormWeight: 1,
			keys: [
				"title",
				"description",
				"hashtags"
			]
		}
		const fuse = new Fuse(resources, fuseOptions)

		const resourcesFound = fuse.search(query).map(item => item.item)
		return resourcesFound
	}

	return { setFilters, filterResources }
}
