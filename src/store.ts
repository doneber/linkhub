import { atom } from "nanostores"
import type { Resource } from "./interfaces/resource.interface"

// export const filtersResources = atom<Filter>({
// 	query: "",
// 	tags: []
// })

export const bookmarks = atom<Resource[]>([])

export const resources = atom<Resource[]>([])
