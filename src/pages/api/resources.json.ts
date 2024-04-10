import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"
import { getFullResourcesData } from "@src/utils/utils"
import type { APIRoute } from "astro"
import Fuse from "fuse.js"

const fullResourcesData = await getFullResourcesData()

// TODO: Probar la mejor configuracion
const fuseOptions = {
	isCaseSensitive: false,
	// includeScore: false,
	shouldSort: true,
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

export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const query = searchParams.get("q")
	const tags = searchParams.getAll("tags")
	const limit = Number(searchParams.get("limit")) || 10
	const offset = Number(searchParams.get("offset")) || 0

	let data: Resource[] = structuredClone(fullResourcesData)

	const cleanQuery = query?.replace(/#(\w+)/g, "") ?? ""

	if (cleanQuery.length > 0) {
			const fuse = new Fuse(data, fuseOptions)
			data = fuse.search(cleanQuery).map(item => item.item)
	}

	if (tags.length > 0) {
		const hashtags = tags.map(tag => `#${tag}`)
		data = data.filter(item => {
			return item.hashtags.some(hashtag => hashtags.includes(hashtag))
		})
	}

	const total = data.length

	const res: ResponseFormat<Resource[]> = {
		data: data.slice(offset, offset + limit),
		info: {
			limit,
			offset,
			total
		}
	}

  return new Response(JSON.stringify(res))
}
