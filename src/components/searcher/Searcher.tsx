import { useEffect, useState } from "preact/hooks"
import "./style.css"
import type { Resource } from "../../interfaces/resource.interface"
import { fetchResources, levenshteinDistance } from "../../utils"
import { searchResults } from "../../store.ts"

interface Props {
  action?: () => void
}

export const Searcher = ({ action }: Props) => {
  const [resources, setResources] = useState<Resource[]>([])

  const getResourcesMatches = (text: string) => {
    return resources.filter((resource) => {
      return levenshteinDistance(resource.title, text) <= 5
    })
  }

  function getQueryParamSearch() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const textQuery = urlSearchParams.get("q")
    return textQuery ?? ""
  }

  useEffect(() => {
    const textQuery = getQueryParamSearch()

    if (textQuery) {
      const $inputSearcher: HTMLInputElement =
        document.querySelector("#textToSearch")!
      $inputSearcher.value = textQuery
    }

    function getResourcesInit() {
      if (resources.length === 0) {
        fetchResources().then(
          (data: { resources: Resource[] }) => {
            setResources(data.resources)
          }
        )
      }
    }

    getResourcesInit()
  }, [])

  useEffect(() => {
    function searching() {
      const textQuery = getQueryParamSearch()
      const resourcesMatched = getResourcesMatches(textQuery)
      searchResults.set(resourcesMatched)
    }
    searching()
  }, [resources])

  const handleSearch = (event: any) => {
    event.preventDefault()

    if (action) {
      action()
    }
    const formData = new FormData(event.target)

    const textToSearch = formData.get("textToSearch") as string // ojo

    // update the url
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append("q", textToSearch)
    window.history.pushState({}, "", `/search?${urlSearchParams.toString()}`)

    // searching
    const resourcesMatched = getResourcesMatches(textToSearch)
    searchResults.set(resourcesMatched)
  }

  return (
    <form className="searcher-container" onSubmit={handleSearch}>
      <input type="text" name="textToSearch" id="textToSearch" className="input" />
      <button type={"submit"} className="searchButtonIcon">
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
  )
}
