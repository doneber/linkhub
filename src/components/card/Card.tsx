interface Props {
  title: string
  description: string
  href: string
  imageUrl?: string | undefined
  hashtags: string[]
}

export const Card = ({ href, title, description, imageUrl, hashtags }: Props) => {
  return (
    <li className="flex bg-[color:var(--background)] bg-none bg-[100%] transition-[background-position] duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] bg-[#191919] p-px rounded hover:bg-[#555] hover:bg-[0] focus:bg-[#555] focus:bg-[0]">
      <a href={href} target="_blank" className="flex flex-col md:flex-row justify-between w-full no-underline leading-[1.4] opacity-80 rounded-lg;">
        <div class="p-4">
          <h2 className="text-xl transition-[color] duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)]">{title}</h2>
          <p class="mt-2 text-[lightgray]">{description}</p>
          <ul className="flex gap-2 flex-wrap mx-0 my-2 p-0;">
            {hashtags.map((hashtag) => (
              <li className="shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pb-1 px-2 rounded-lg">{hashtag}</li>
            ))}
          </ul>
          <p class="text-xl mt-2 ">{href}</p>
        </div>
        {/* TODO: is la imagen da error, no mostrar */}
        {imageUrl && <img className="  max-md:mx-auto aspect-square" src={imageUrl}  width={250} height={250} alt={`Imagen de ${title}`}/>}
      </a>
    </li>
  )
}
