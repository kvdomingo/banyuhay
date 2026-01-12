import inter from "@fontsource-variable/inter/wght?url";
import interItalic from "@fontsource-variable/inter/wght-italic?url";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import maplibre from "maplibre-gl";
import { Protocol } from "pmtiles";
import { LoginUserHeader } from "@/components/login-user-header";
import { Map as MapLibre } from "@/components/ui/map";
import {
  INITIAL_BEARING,
  INITIAL_CENTER,
  INITIAL_PITCH,
  INITIAL_ZOOM,
} from "@/lib/constants";
import appCss from "@/styles.css?url";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Banyuhay",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Banyuhay",
      },
      {
        property: "og:description",
        content: "Banyo ng buhay",
      },
      {
        property: "og:url",
        content: "https://banyuh.ai",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:creator",
        content: "@rockentothemoon",
      },
      {
        name: "twitter:title",
        content: "Banyuhay",
      },
      {
        name: "twitter:description",
        content: "Banyo ng buhay",
      },
      {
        name: "twitter:url",
        content: "https://banyuh.ai",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: inter,
      },
      {
        rel: "stylesheet",
        href: interItalic,
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: Layout,
  beforeLoad: () => {
    const protocol = new Protocol();
    maplibre.addProtocol("pmtiles", protocol.tile);
  },
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        <main className="h-dvh w-dvw">
          <LoginUserHeader />

          <MapLibre
            center={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            pitch={INITIAL_PITCH}
            bearing={INITIAL_BEARING}
            styles={{
              light: "https://tiles.openfreemap.org/styles/bright",
              dark: "https://tiles.openfreemap.org/styles/dark",
            }}
            scrollZoom
          >
            {children}
          </MapLibre>
        </main>

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
