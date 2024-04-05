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

export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const query = searchParams.get("q")
	const tags: string | null = searchParams.get("tags") // eyes
	const limit = Number(searchParams.get("limit")) || 10
	const offset = Number(searchParams.get("offset")) || 0

	let data: Resource[] = structuredClone(fullResourcesData)
	const total = data.length

	if (query) {
			const fuse = new Fuse(data, fuseOptions)
			data = fuse.search(query).map(item => item.item)
	}

	if (tags) {
		const theHashtag = `#${tags}`
		data = data.filter(item => item.hashtags.includes(theHashtag))
	}

	data = data.slice(offset, offset + limit)

	const res: ResponseFormat<Resource[]> = {
		data,
		info: {
			limit,
			offset,
			total
		}
	}

  return new Response(JSON.stringify(res)
  )
}
