import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "./contexts";

export function useServer() {
  const auth = useContext(AuthContext)?.auth;

  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      Authorization: auth,
    },
  });
}
