import { useEffect, useState } from "preact/hooks";
import "./style.css";
import type { Resource } from "../../interfaces/resource.interface"
import { levenshteinDistance } from '../../utils'

export const Searcher = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  const getResources = async (url: string) => {
    await fetch(url)
      .then((response) => response.text())
      .then((text) => {
        // Divide el texto en líneas
        const lines = text.split("\n");
        // Obtiene las claves de la primera línea y elimina los espacios en blanco
        const keys = lines[0].split(",").map((key) => key.trim());
        // Inicializa el array de objetos
        const objectsArray = lines.slice(1).map((line) => {
          // Divide cada línea por comas para obtener los valores
          const values = line.split(",");
          // Crea un objeto para la línea actual y lo retorna
          let obj: any = {};
          keys.forEach((key, index) => {
            obj[key] = values[index].trim(); // También asegúrate de eliminar los espacios en blanco de los valores
          });
          return obj;
        });
        setResources(objectsArray);
        return objectsArray;
      });
  };


  const getResourcesMatches = (text:string) => {
    return resources.filter(resource => {
      return levenshteinDistance(resource.title, text) < 3
    })
  }

  useEffect(() => {
    const CSV_URL = "/resources.csv";
    // "https://raw.githubusercontent.com/doneber/linkhub/main/public/resources.csv";

    getResources(CSV_URL); 
  }, []);

  const search = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const textToSearch = formData.get("textToSearch") as string // ojo
    const resourcesMatched = getResourcesMatches(textToSearch)
    console.log({resourcesMatched});
    

  };

  return (
    <form className="searcher-container" onSubmit={search}>
      <input type="text" name="textToSearch" id="" />
      <button type={"submit"}>
        <svg
          width="30"
          fill="#fff"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </button>
    </form>
  );
};
