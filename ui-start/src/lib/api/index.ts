import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./generated";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "/api",
  credentials: "include",
});

export const api = createClient(fetchClient);
