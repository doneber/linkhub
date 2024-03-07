import "./style.css"

interface Props {
  title: string
  description: string
  href: string
  imageUrl?: string | undefined
  hashtags: string[]
}

export const Card = ({ href, title, description, imageUrl, hashtags }: Props) => {
  return (
    <li class="link-card">
      <a href={href} target="_blank">
        <div class="link-content">
          <h2>{title}</h2>
          <p class="link-content-description">{description}</p>
          <ul className="hashtags-list">
            {hashtags.map((hashtag) => (
              <li>{hashtag}</li>
            ))}
          </ul>
          <p class="link-content-url">{href}</p>
        </div>
        {/* TODO: is la imagen da error, no mostrar */}
        {imageUrl && <img src={imageUrl} width="150px" height="auto" />}
      </a>
    </li>
  )
}
