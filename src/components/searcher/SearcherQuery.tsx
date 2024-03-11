import { SearchIcon } from "./SearchIcon"

export const SearcherQuery = () => {
  return (
    <form action="/search" method="GET" autocomplete="off" className="flex flex-col justify-center items-center gap-6">
			<div className="flex border rounded-lg border-solid border-neutral-700 w-full max-w-[520px] pl-4 py-0">
				<input required name="q" placeholder="Ej. svg" className="w-full bg-transparent focus:border-transparent focus:outline-none focus:ring-0  " />
				<button type={"submit"} className="flex justify-center items-center border-none p-0 pt-2 pb-1 px-2 rounded-lg">
					<SearchIcon />
				</button>
			</div>
			{/* TODO: Analizar un mejor diseño */}
			{/* <div className="flex gap-4">
				<button type={"submit"} className="text-lg border border-solid border-neutral-700 rounded px-8 py-2 dark:bg-neutral-200 dark:hover:bg-neutral-300 hover:bg-neutral-700 bg-neutral-800">
					Buscar
				</button>
				<a href="/all" type={"button"} className="text-lg border border-solid border-neutral-800 rounded px-5 py-2 bg-transparent hover:bg-neutral-800 dark:hover:bg-neutral-200">
					Ver todos
				</a>
			</div> */}
    </form>
  )
}
