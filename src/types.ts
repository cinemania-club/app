export type State<T> = {
  get: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export type Movie = {
  _id: number;
  title: string;
  runtime: number;
  release_date: number;
  vote_average: number;
  poster_path: string;
  overview: string;
  userVote?: number;
};
