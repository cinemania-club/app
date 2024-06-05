import { createContext } from "react";

import { CatalogItemData, Playlist } from "./types";

type CatalogItemPayload = {
  item: CatalogItemData;
  playlists: Playlist[];
  addPlaylist: (id: string, name: string) => void;
  showOverview: (show: boolean) => void;
  rate: (stars: number) => void;
};

export const AuthContext = createContext("");

export const CatalogItemContext = createContext<CatalogItemPayload | undefined>(
  undefined,
);
