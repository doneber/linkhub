import { useEffect, useState } from "preact/hooks"
import { Tag } from "./Tag"

export const TagList = () => {
	const [hashtags, setHashtags] = useState<string[]>([])

	useEffect(() => {
		async function getHashtags() {
			fetch("/api/hashtags.json")
			.then(res => res.json())
			.then(json => {
				const firstTags = json.hashtags.splice(0, 8)
				setHashtags(firstTags)
			})
		}
		getHashtags()
	}, [])

	return (
		<section className="mt-8">
		<div className=" flex flex-wrap justify-center gap-2.5 max-w-[32rem] mx-auto">
			{
				hashtags?.map(tag => {
					return <Tag text={
						// ".substring(1)" para eliminar el simbolo "#"
						tag.substring(1)
					} />
				})
			}
		</div>
		</section>
	)
}