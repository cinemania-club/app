import { createContext } from "react";

import { CatalogItemData, Playlist } from "./types";

type CatalogItemPayload = {
  playlists: Playlist[];
  item: CatalogItemData;
  showOverview: (show: boolean) => void;
  rate: (stars: number) => void;
};

export const AuthContext = createContext("");

export const CatalogItemContext = createContext<CatalogItemPayload | undefined>(
  undefined,
);
