export type State<T> = {
  get: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export enum CatalogItemFormat {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
}

export type CatalogItemData = {
  _id: string;
  format: CatalogItemFormat;
  posterPath: string;
  title: string;
  overview: string;
  genres: number[];
  runtime: number;
  firstAirDate: string;
  lastAirDate: string;
  rating: Rating;
};

export type ItemDetailsData = {
  _id: string;
  format: CatalogItemFormat;
  backdropPath: string;
  title: string;
  overview: string;
  genres: number[];
  runtime: number;
  firstAirDate: string;
  lastAirDate: string;
  rating: Rating;
};

type Rating = {
  all: number;
  user?: number;
};
