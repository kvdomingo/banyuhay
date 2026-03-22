import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createRouterClient, lazy, type RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const router = {
  toilet: lazy(() => import("./toilets")),
  review: lazy(() => import("./reviews")),
};

const getORPCClient = createIsomorphicFn()
  .client(
    (): RouterClient<typeof router> =>
      createORPCClient(
        new RPCLink({
          url: `${window.location.origin}/rpc`,
        }),
      ),
  )
  .server(() =>
    createRouterClient(router, {
      context: async () => ({
        headers: getRequestHeaders(),
      }),
    }),
  );

const client = getORPCClient();

export const orpc = createTanstackQueryUtils(client);
