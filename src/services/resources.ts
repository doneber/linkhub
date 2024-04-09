import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"

export const fetchResources = async ({
	limit = 10,
	offset = 0,
	query = "",
	tags = "",
}) => {
	const response = await fetch(
		`/api/resources.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&tags=${tags}`
		)
	return await response.json() as ResponseFormat<Resource[]>
}
