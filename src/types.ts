export type State<T> = {
  get: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  userVote?: number;
};

export type MovieDetails = {
  id: number;
  title: string;
  backdrop_path: string;
  genres: string[];
  release_date: string;
  runtime: number;
  overview: string;
  scaledVoteAverage: number;
  userVote?: number;
};
