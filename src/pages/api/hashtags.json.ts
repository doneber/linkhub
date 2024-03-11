import { listHashtagsFromCsv } from "@utils/utils"
import type { APIRoute } from "astro"

export const GET: APIRoute = async () => {
  const CSV_URL =
    "https://raw.githubusercontent.com/doneber/linkhub/main/public/resources.csv"

	const hashtagList =	await listHashtagsFromCsv(CSV_URL)

  return new Response(
    JSON.stringify({
      hashtags: hashtagList,
    })
  )
}
