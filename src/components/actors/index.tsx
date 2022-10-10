import { useEffect, useState } from "react"
import { IActor, IMovie } from "@/components/interfaces"

export const Actors = () => {
	const [actors, setActors] = useState<Array<IActor>>([])

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://api.themoviedb.org/3/person/popular?api_key=0544e732b88a2287b7288288339c30cf");
				if (!response.ok) throw Error("Can't get the response");

				const json = await response.json();
				setActors(json.results)
			} catch (e) {
				console.log(e);
			}
		})()
	}, [])

	return (
		<>
			<section>
				<p className="font-bold text-5xl mx-10 mb-10">Popular People</p>
				<div className="grid grid-cols-6 gap-y-2">
					{actors.map((actor: IActor) => {
						return actor.profile_path && (
							<a href={`/person/${actor.id}`} className="mx-10 hover:underline">
								<img className="rounded-xl w-full mb-2" src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`} />
								<div className="flex flex-col justify-between">
									<p className="text-md font-bold">
										{actor.name}
									</p>
									<p className="text-md w-40 truncate font-medium text-gray-500/70">
										{actor.known_for.map((movie: IMovie) => movie.name || movie.title).join(', ')}
									</p>
								</div>
							</a>
						)
					})}
				</div>
			</section>
		</>
	)
}