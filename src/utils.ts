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

//  getResources to build resources.json API
export async function getResources(url: string) {
  return await fetch(url)
    .then((response) => response.text())
    .then((text) => {
      // Divide el texto en líneas
      const lines = text.split("\n");
      // Obtiene las claves de la primera línea y elimina los espacios en blanco
      const keys = lines[0].split(",").map((key) => key.trim());
      // Inicializa el array de objetos
      const objectsArray: Resource[] = lines.slice(1).map((line) => {
        // Divide cada línea por comas para obtener los valores
        const values = line.split(",");
        // Crea un objeto para la línea actual y lo retorna
        let obj: any = {};
        keys.forEach((key, index) => {
          obj[key] = values[index].trim(); // También asegúrate de eliminar los espacios en blanco de los valores
        });
        return obj;
      });
      return objectsArray;
    });
}
