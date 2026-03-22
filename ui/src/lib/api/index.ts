import { createIsomorphicFn } from "@tanstack/react-start";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import type { paths } from "./generated";

const getBaseUrl = createIsomorphicFn()
  .client(() => "/api")
  .server(() => process.env.API_URL ?? "http://api:8000");

export const api = createClient<paths>({
  baseUrl: getBaseUrl(),
  credentials: "include",
});

export const queryFetchClient = createFetchClient<paths>({
  baseUrl: getBaseUrl(),
  credentials: "include",
});

export const queryApi = createQueryClient(queryFetchClient);
