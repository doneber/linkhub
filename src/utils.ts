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
