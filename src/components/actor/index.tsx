import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IActor, IMovie } from "../interfaces"

export const Actor = () => {
	const { id } = useParams();
	const [actor, setActor] = useState<IActor>()
	const [movies, setMovies] = useState<Array<IMovie>>([])

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=0544e732b88a2287b7288288339c30cf`);
				const movieResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=0544e732b88a2287b7288288339c30cf`);
				if (!response.ok) throw Error("Can't get the response");

				const json = await response.json();
				const movieJson = await movieResponse.json();

				setActor(json)
				setMovies(movieJson.cast)
			} catch (e) {
				console.log(e);
			}
		})()
	}, [])

	if (!actor) return <div className="flex items-center justify-center font-Roboto text-2xl">is Loading...</div>

	return (
		<>
			<section className="flex justify-evenly font-Roboto overflow-x-hidden">
				<div>
					<img className="rounded-xl" src={`https://image.tmdb.org/t/p/h632${actor.profile_path}`} />
				</div>

				<div className="flex flex-col justify-evenly w-3/6">
					<div className="mb-6">
						<p className="font-bold text-5xl mb-8">{actor.name}</p>
						<p className="text-md font-medium">{actor.biography}</p>
					</div>

					<div>
						<p className="font-bold text-5xl mb-8">Known for</p>
						<div className="flex overflow-x-auto">
							{movies.sort((a, b) => { return b.vote_average.valueOf() - a.vote_average.valueOf() }).map((movie, index) => {
								return movie.poster_path && (
									<a href={`/movie/${movie.id}`} key={index} className="flex flex-col mx-4 cursor-pointer hover:underline">
										<img className="rounded-xl w-full mb-6" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
										<div className="flex justify-between">
											<p className="text-md font-bold mr-6">
												{movie.name || movie.title}
											</p>
											<p className="text-md font-medium text-gray-500/70">
												{movie.vote_average.toString()}
											</p>
										</div>
									</a>
								)
							})}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}