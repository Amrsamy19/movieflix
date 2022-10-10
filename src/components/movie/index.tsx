import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IGenre, IMovie } from "../interfaces"

export const Movie = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState<IMovie>();
	const [genres, setGenres] = useState<Array<string>>([]);

	const convertMinutestoHours = (totalMinutes: any) => {
		return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
	}

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0544e732b88a2287b7288288339c30cf`);
				if (!response.ok) throw Error("Can't get the response");

				const json = await response.json();
				setMovie(json)
				setGenres(json.genres.map((genre: IGenre) => genre.name))
			} catch (e) {
				console.log(e);
			}
		})()
	}, [])

	if (!movie) return <div className="flex items-center justify-center font-Roboto text-2xl">is Loading...</div>

	return (
		<>
			<section className="flex items-center justify-evenly font-Roboto">
				<div className="relative rounded">
					<img className="rounded-xl w-full" src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`} />
					<div className="w-full h-fit bg-black/[.5] rounded-lg absolute bottom-0 p-8 z-10 flex flex-col justify-end items-start">
						<p className="text-4xl text-white font-bold">
							{movie.title || movie.name}
						</p>
						<p className="text-md text-white font-medium">{`${genres.join(', ')} - ${convertMinutestoHours(movie.runtime)}`}</p>
					</div>
				</div>

				<div className="w-2/6">
					<p className="font-bold text-5xl mb-10">Overview</p>
					<p className="text-md font-medium">{movie.overview}</p>
				</div>
			</section>
		</>
	)
}