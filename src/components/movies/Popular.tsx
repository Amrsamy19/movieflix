import { useEffect, useState } from "react";
import { IMovie } from "../interfaces";

export const Popular = () => {
  const [popularMovies, setPopularMovies] = useState<Array<IMovie>>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=0544e732b88a2287b7288288339c30cf&language=en-US&page=1"
      );
      if (!response.ok) throw Error(response.statusText);
      const json = await response.json();
      setPopularMovies(json.results);
    })();
  }, []);

  return (
    <>
      <section>
        <p className="font-bold text-5xl mb-10">Popular</p>
        <div className="grid gap-x-3 gap-y-6 grid-cols-4 w-full auto-cols-fr">
          {popularMovies.map((movie) => {
            return (
              <a
                href={`/movie/${movie.id}`}
                key={movie.id.toString()}
                className="flex flex-col cursor-pointer hover:underline"
              >
                <img
                  className="rounded-xl w-full mb-6"
                  src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                />
                <div className="flex justify-between">
                  <p className="text-md font-bold mr-6">
                    {movie.name || movie.title}
                  </p>
                  <p className="text-md font-medium text-gray-500/70">
                    {movie.vote_average.toString()}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
};
