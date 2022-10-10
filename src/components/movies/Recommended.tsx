import { useState, useEffect } from "react"
import { IMovie } from "@/components/interfaces"

export const Recommended = () => {
	const [recommended, setRecommended] = useState<IMovie>();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=0544e732b88a2287b7288288339c30cf");
				if (!response.ok) throw Error("Can't get the response");

				const json = await response.json();
				setRecommended(json.results[0])
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	if (!recommended) return <div>Loading</div>

	return (
		<>
			<section className="mb-10">
				<p className="font-bold text-5xl mb-10">Recommended</p>
				<a href={`/movie/${recommended.id}`} className="relative mb-10">
					<img className="shadow-2xl rounded-xl w-full" src={`https://image.tmdb.org/t/p/w1280${recommended.backdrop_path}`} />
					<div className="opacity-0 hover:opacity-100 hover:bg-black/[.7] rounded-xl duration-300 absolute inset-0 z-10 flex justify-center items-center">
						<p className="text-3xl text-white font-bold">
							{recommended.title || recommended.name}
						</p>
					</div>
				</a>
			</section>
		</>
	)
}