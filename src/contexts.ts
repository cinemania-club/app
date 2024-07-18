import { createContext } from "react";

import { CatalogItemData, Playlist } from "./types";

type CatalogItemPayload = {
  item: CatalogItemData;
  playlists: Playlist[];
  addPlaylist: (id: string, name: string) => void;
  deletePlaylist: (id: string) => void;
  setItemPlaylists: (playlistsIds: string[]) => void;
  showOverview: (show: boolean) => void;
  rate: (stars: number) => void;
};

type AuthPayload = {
  auth: string;
  saveToken: (token: string) => void;
};

export const AuthContext = createContext<AuthPayload | undefined>(undefined);

export const CatalogItemContext = createContext<CatalogItemPayload | undefined>(
  undefined,
);
