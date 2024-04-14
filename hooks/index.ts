import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../components/AuthProvider";

export function useServer() {
  const token = useContext(AuthContext);

  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      Authorization: token,
    },
  });
}
