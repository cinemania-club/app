export type State<T> = {
  get: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export enum CatalogItemFormat {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
}

type Playlist = {
  _id: string;
  name: string;
};

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
  ratings: Rating;
  showOverview: boolean;
  playlists: Playlist[];
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
  ratings: Rating;
};

type Rating = {
  general: number;
  user?: number;
};
