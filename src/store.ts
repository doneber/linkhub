import { atom } from "nanostores"
import type { Filter } from "./interfaces/filter.interface"

export const filtersResources = atom<Filter>({
	query: "",
	tags: []
})