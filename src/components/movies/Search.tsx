import { useEffect, useState } from "react";
import { IMovie } from "@/components/interfaces";

export const Search = () => {
  const [results, setResults] = useState<Array<IMovie>>([]);
  const [query, setQuery] = useState<string>("");

  const handleChange = (input: string) => {
    setQuery(input);
  };

  useEffect(() => {
    (async () => {
      if (query !== "") {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=0544e732b88a2287b7288288339c30cf&language=en-US&page=1&include_adult=false&query=${query}`
        );
        if (!res.ok) throw Error("Can't get the response");
        const json = await res.json();
        setResults(json.results);
      } else {
        setResults([]);
      }
    })();
  }, [query]);

  return (
    <>
      <section className="bg-light-purple rounded-2xl h-fit p-4">
        <input
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={query}
          className="w-full p-4 text-lg text-white border-b-2 placeholder-white bg-transparent mb-4"
          type="text"
          name="query"
          placeholder="Search by movie name"
        />
        <ul className="h-96 overflow-x-hidden overflow-y-auto">
          {results.map((movie) => {
            return (
              <li key={movie.id.toString()} className="mb-6">
                <a
                  href={`/movie/${movie.id}`}
                  className="relative m-auto w-5/6"
                >
                  <img
                    className="rounded-xl"
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path || movie.poster_path
                    }`}
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
      </section>
    </>
  );
};
