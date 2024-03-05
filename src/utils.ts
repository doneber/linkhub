import type { Resource } from "./interfaces/resource.interface";
export function levenshteinDistance(a: string, b: string) {
  const matriz = [];

  // Inicializar la matriz de costos
  for (let i = 0; i <= a.length; i++) {
    matriz[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    matriz[0][j] = j;
  }

  // Calcular la distancia
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matriz[i][j] = matriz[i - 1][j - 1];
      } else {
        matriz[i][j] = Math.min(
          matriz[i - 1][j] + 1, // borrado
          matriz[i][j - 1] + 1, // inserción
          matriz[i - 1][j - 1] + 1 // sustitución
        );
      }
    }
  }

  return matriz[a.length][b.length];
}

// TODO: Separar las funciones para el cliente y para el build

//
export async function fetchResources(
  url = "/api/resources.json"
): Promise<{ resources: Resource[] }> {
  return await fetch(url).then((res) => {
    return res.json();
  });
}


interface CsvRow {
  url: string;
  hashtags: string[];
}

function parseCsvToObjects(csvText: string) {
  const lines: string[] = csvText.split("\n").filter((line) => line.trim() !== "");
  const keys: string[] = lines[0].split(",").map((key) => key.trim());
  const objectsArray: CsvRow[] = lines.slice(1).map((line: string) => {
    const values: string[] = line.split(",").map((value) => value.trim());
    let obj: Partial<CsvRow> = {}; // Usamos Partial para poder construir el objeto de manera incremental
    keys.forEach((key, index) => {
      if (key === "hashtags") {
        // Maneja el caso en que la fila no tenga hashtags o la columna esté vacía
        const hashtags: string = values[index] || "";
        obj.hashtags = hashtags
          ? hashtags.split(" ").filter((tag) => tag.startsWith("#"))
          : [];
      } else {
        obj.url = values[index];
      }
    });
    return obj as CsvRow; // Afirmamos que obj es de tipo CsvRow
  });
  console.log({objectsArray});
  return objectsArray;
}

//  getResources to build resources.json API
export async function getResources(url: string) {
  return await fetch(url)
    .then((response) => response.text())
    .then((csvText) => {
      return parseCsvToObjects(csvText)
    });
}
