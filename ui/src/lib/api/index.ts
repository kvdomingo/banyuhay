import createFetchClient from "openapi-fetch";
import createClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import type { paths } from "./generated";

export const api = createClient<paths>({
  baseUrl: "/api",
  credentials: "include",
});

export const queryFetchClient = createFetchClient<paths>({
  baseUrl: "/api",
  credentials: "include",
});

export const queryApi = createQueryClient(queryFetchClient);
