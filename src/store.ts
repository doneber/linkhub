import { atom } from "nanostores"
import type { Filter } from "./interfaces/filter.interface"
import type { Resource } from "./interfaces/resource.interface"

export const filtersResources = atom<Filter>({
	query: "",
	tags: []
})

export const bookmarks = atom<Resource[]>([])
