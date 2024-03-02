import type { APIRoute } from "astro";
import cheerio from "cheerio";
import type { Resource } from "../../interfaces/resource.interface";
import { getResources } from "../../utils";

export const GET: APIRoute = async ({ params, request }) => {
  // get resources

  const CSV_URL =
    "https://raw.githubusercontent.com/doneber/linkhub/main/public/resources.csv";

  const resources = (await getResources(CSV_URL)) as Resource[];

  // TODO: No solo obtener las imagenes OG, sino también el título y la descripción
  const getImageOG = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud HTTP: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr("content");
    return ogImage;
  };

  const fullResourcesData = await Promise.all(
    resources.map(async (resource) => {
      const ogImage = await getImageOG(resource.url);
      return {
        ...resource,
        imageUrl: ogImage,
      };
    })
  );

  return new Response(
    JSON.stringify({
      resources: fullResourcesData,
    })
  );
};
