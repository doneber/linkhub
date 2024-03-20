import type { Resource } from "@interfaces/resource.interface"

// TODO: Separar las funciones para el cliente y para el build

export async function fetchResources(
  url = "/api/resources.json"
): Promise<{ resources: Resource[] }> {
  return await fetch(url).then((res) => {
    return res.json()
  })
}

interface CsvRow {
  url: string
  hashtags: string[]
}

export function parseCsvToObjects(csvText: string) {
  const lines: string[] = csvText.split("\n").filter((line) => line.trim() !== "")
  const keys: string[] = lines[0].split(",").map((key) => key.trim())
  const objectsArray: CsvRow[] = lines.slice(1).map((line: string) => {
    const values: string[] = line.split(",").map((value) => value.trim())
    const obj: Partial<CsvRow> = {} // Usamos Partial para poder construir el objeto de manera incremental
    keys.forEach((key, index) => {
      if (key === "hashtags") {
        // Maneja el caso en que la fila no tenga hashtags o la columna esté vacía
        const hashtags: string = values[index] || ""
        obj.hashtags = hashtags
          ? hashtags.split(" ").filter((tag) => tag.startsWith("#"))
          : []
      } else {
        obj.url = values[index]
      }
    })
    return obj as CsvRow // Afirmamos que obj es de tipo CsvRow
  })
  return objectsArray
}

//  getResources to build resources.json API
export async function getResources(url: string) {
  return await fetch(url)
    .then((response) => response.text())
    .then((csvText) => {
      return parseCsvToObjects(csvText)
    })
}

// getHashtags
// Define la interfaz para las filas del CSV.
interface CsvRow {
  url: string
  hashtags: string[]
}

// Función para procesar el contenido del CSV y listar los hashtags.
export async function listHashtagsFromCsv(csvFilePath: string): Promise<string[]> {
  const response = await fetch(csvFilePath)
  const text = await response.text()
  const lines: string[] = text.split("\n").filter(line => line.trim() !== "")
  const keys: string[] = lines[0].split(",").map(key => key.trim())

  // Utiliza un Set para evitar hashtags duplicados.
  const hashtagsSet = new Set<string>()

  lines.slice(1).forEach((line: string) => {
    const values: string[] = line.split(",").map(value => value.trim())
    keys.forEach((key, index) => {
      if (key === "hashtags" && values[index]) {
        // Divide el valor por espacios y filtra los elementos que comiencen con '#'.
        const hashtags: string[] = values[index].split(" ").filter(tag => tag.startsWith("#"))
        // Agrega cada hashtag al Set.
        hashtags.forEach(tag => hashtagsSet.add(tag))
      }
    })
  })

  // Convierte el Set a un array y lo devuelve.
  return Array.from(hashtagsSet)
}

export function getTittleFromUrl(url: string) {
  // Eliminar protocolo y subdominios
  let title = url.replace(/(^\w+:|^)\/\/(www\.)?/, "")

  // Eliminar ruta y parámetros de consulta
  title = title.replace(/\/.*$/, "")

  // Eliminar extensión si la URL termina con ella
  title = title.replace(/\.\w+$/, "")

  return title
}
