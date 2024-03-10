interface Props {
  title: string
  description: string
  href: string
  imageUrl?: string | undefined
  hashtags: string[]
}

export const Card = ({ href, title, description, imageUrl, hashtags }: Props) => {
  return (
    <li className="rounded border-[1px] border-[solid] border-neutral-700 hover:bg-neutral-800 hover:bg-[0]">
      <a href={href} target="_blank" className="flex max-h-40 flex-col md:flex-row">
        <div class="flex w-full flex-col p-4">
          <h2 className="min-h-4 truncate text-base">{title}</h2>
          <p class="mt-2 text-sm text-neutral-400"
							style="
								@apply overflow-hidden;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
								overflow: hidden;
								text-overflow: ellipsis;
							"
					>{description}</p>
          <ul className="mx-0 my-2 flex flex-wrap gap-1 p-0">
            {hashtags.map((hashtag) => (
              <li className="rounded-lg border-[1px] border-[solid] border-neutral-800 px-[6px] pb-[2px] pt-[1px] text-sm">{hashtag}</li>
            ))}
          </ul>
          <p class="mt-auto truncate text-sm">{href}</p>
        </div>
        {/* TODO: is la imagen da error, no mostrar */}
        {imageUrl && (<div className="w-[32rem] hidden md:block">
					<img loading="lazy" className="w-full h-full object-cover" src={imageUrl} alt={`Imagen de ${title}`}/>
				</div>)}
      </a>
    </li>
  )
}
