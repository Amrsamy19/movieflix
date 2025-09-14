import { useEffect, useState } from "react";
import { IMovie } from "@/components/interfaces";

export const Trending = () => {
  const [trending, setTrending] = useState<Array<IMovie>>([]);
  const [topTrending, setTopTrending] = useState<IMovie>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=0544e732b88a2287b7288288339c30cf"
        );
        if (!response.ok) throw Error("Can't get the response");

        const json = await response.json();
        setTopTrending(json.results.shift());
        setTrending(json.results);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  if (!topTrending) return <div>Loading</div>;

  return (
    <>
      <section className="">
        <div className="bg-black flex flex-col items-center rounded-2xl h-fit font-Roboto p-4">
          <a href={`/movie/${topTrending.id}`} className="relative mb-10">
            <img
              className="rounded-xl w-full"
              src={`https://image.tmdb.org/t/p/w500${topTrending.backdrop_path}`}
            />
            <div className="opacity-0 hover:opacity-100 hover:bg-black/[.7] rounded-xl duration-300 absolute inset-0 z-10 flex justify-center items-center">
              <p className="text-xl text-white font-bold">
                {topTrending.title || topTrending.name}
              </p>
            </div>
          </a>
          <div className="w-full">
            <p className="text-xl text-white text-center mb-6">Now Trending</p>
            <ul className="flex flex-col items-center h-72 overflow-x-hidden overflow-y-auto">
              {trending.map((movie) => {
                return (
                  <li key={movie.id.toString()} className="mb-6">
                    <a
                      href={`/movie/${movie.id}`}
                      className="relative m-auto w-5/6"
                    >
                      <img
                        className="rounded-xl"
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                      />
                      <div className="opacity-0 hover:opacity-100 hover:bg-black/[.7] rounded-xl duration-300 absolute inset-0 z-10 flex justify-center items-center">
                        <p className="text-xl text-white font-bold">
                          {movie.title || movie.name}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
