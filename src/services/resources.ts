import type { ResponseFormat } from "@src/interfaces/ReponseFormat.interface"
import type { Resource } from "@src/interfaces/resource.interface"

export const fetchResources = async ({
	limit = 10,
	offset = 0,
	query = ""
}) => {
	const response = await fetch(`/api/resources.json?q=${query}&limit=${limit}&offset=${offset}`)
	const data: ResponseFormat<Resource[]> = await response.json()
	return data.data
}
