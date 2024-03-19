import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { getTittleFromUrl, parseCsvToObjects } from "@src/utils/utils"
import type { APIRoute } from "astro"
import cheerio from "cheerio"

const filePath = path.resolve(process.cwd(), "public", "resources.csv")

const csvText = await fs.readFile(filePath, "utf-8")
const resources = parseCsvToObjects(csvText)
const getMetadata = async (url: string) => {
	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Error en la solicitud HTTP: ${response.status}`)
		}
		const html = await response.text()
		const $ = cheerio.load(html)
		const imageUrl = $("meta[property=\"og:image\"]").attr("content") ?? undefined
		const fullTitle = $("title").text() || $("meta[property=\"og:title\"]").attr("content") || getTittleFromUrl(url)
		const titleParts = fullTitle.split(/ – | - | \| | — |: | : | · /) // Usa una expresión regular para cubrir ambos separadores
		const title = titleParts[0] ?? "" // Toma solo la primera parte, asumiendo que es el "verdadero" título

		let description = $("meta[property=\"og:description\"]").attr("content")
		if (!description) {
			description = $("meta[name=\"description\"]").attr("content") ?? ""
		}

		return { title, description, imageUrl }
	} catch (error) {
		return { title: getTittleFromUrl(url) }
	}
}

const fullResourcesData = await Promise.all(
	resources.map(async (resource) => {
		const metadata = await getMetadata(resource.url)
		return {
			...resource,
			...metadata,
		}
	})
)

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
      resources: fullResourcesData
    })
  )
}
