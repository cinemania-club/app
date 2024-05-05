import { createContext } from "react";

import { CatalogItemData } from "./types";

type CatalogItemPayload = {
  item: CatalogItemData;
  rate: (stars: number) => void;
};

export const AuthContext = createContext("");

export const CatalogItemContext = createContext<CatalogItemPayload | undefined>(
  undefined,
);
