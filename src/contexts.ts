import { createContext } from "react";

import { Movie } from "./types";

type MoviePayload = {
  movie: Movie;
  vote: (stars: number) => void;
};

export const AuthContext = createContext("");

export const MovieContext = createContext<MoviePayload | undefined>(undefined);
