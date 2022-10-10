export interface IMovie {
	poster_path: string;
	adult: Boolean;
	overview: string;
	release_date: string;
	genre_ids: Array<Number>;
	genres: Array<IGenre>;
	id: Number;
	original_title: string;
	original_language: string;
	title: string;
	name: string;
	backdrop_path: string;
	popularity: Number;
	runtime: Number;
	vote_count: Number;
	video: Boolean;
	vote_average: Number;
}

export interface IActor {
	profile_path: string;
	adult: boolean;
	id: Number;
	name: string;
	biography: string;
	popularity: Number;
	known_for: Array<IMovie>;
}

export interface IGenre {
	id: Number;
	name: string;
}
