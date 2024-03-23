import type { Resource } from "@src/interfaces/resource.interface"
import { fetchResources } from "@src/utils/utils"
import { useEffect, useState } from "preact/hooks"

export function useResources() {
	const [resources, setResources] = useState<Resource[]>([])

	useEffect(() => {
		async function getResourcesInit() {
			const data = await fetchResources()
			setResources(data.resources)
		}

		getResourcesInit()
	}, [])

	return { resources }
}