export type State<T> = {
  get: T;
  set: React.Dispatch<React.SetStateAction<T>>;
};

export enum CatalogItemFormat {
  MOVIE = "MOVIE",
  SERIES = "SERIES",
}

export enum PlaylistType {
  WATCH_LATER = "WATCH_LATER",
  ARCHIVED = "ARCHIVED",
  CUSTOM = "CUSTOM",
}

export type Playlist = {
  _id: string;
  name: string;
  type: PlaylistType;
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
  playlists: string[];
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
