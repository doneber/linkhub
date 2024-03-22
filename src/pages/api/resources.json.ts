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
const fuse = new Fuse(fullResourcesData, fuseOptions)

export const GET: APIRoute = async ({ request }) => {
	const { url } = request
	const searchParams = new URL(url).searchParams
	const query = searchParams.get("q")

	if (query) {
		return new Response(JSON.stringify({
				resources: fuse.search(query).map(item => item.item)
			})
		)
	}

  return new Response(JSON.stringify({
      resources: fullResourcesData
    })
  )
}
