import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { lazy, type RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const router = {
  toilet: lazy(() => import("./toilets")),
  review: lazy(() => import("./reviews")),
};

const getRpcClientLink = createIsomorphicFn()
  .client(
    () =>
      new RPCLink({
        url: `${window.location.origin}/api/rpc`,
      }),
  )
  .server(
    () =>
      new RPCLink({
        url: "http://localhost:3000/api/rpc",
        headers: () => getRequestHeaders(),
      }),
  );

const client: RouterClient<typeof router> = createORPCClient(getRpcClientLink());

export const orpc = createTanstackQueryUtils(client);
