import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"

export const fetchResources = async ({
	limit = 10,
	offset = 0,
	query,
	tags,
}: {
	limit: number
	offset: number
	query?: string
	tags?: string[]
}) => {
	const searchParams = new URLSearchParams()
	searchParams.append("limit", String(limit))
	searchParams.append("offset", String(offset))

	if (query) searchParams.append("q", String(query))

	tags?.forEach(tag => {
		searchParams.append("tags", tag)
	})

	const response = await fetch(
		`/api/resources.json?${searchParams.toString()}`
	)
	return await response.json() as ResponseFormat<Resource[]>
}
