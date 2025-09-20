import { createFileRoute } from "@tanstack/react-router";
import { Map as MapLibre } from "@vis.gl/react-maplibre";
import { InfoPanel } from "@/components/info-panel";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <MapLibre
      initialViewState={{
        zoom: 10.5,
        latitude: 14.56,
        longitude: 121.04,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
      style={{ height: "100vh", position: "fixed" }}
      maxPitch={0}
      minPitch={0}
      pitch={0}
      bearing={0}
      attributionControl={false}
      cancelPendingTileRequestsWhileZooming
    >
      <InfoPanel />
    </MapLibre>
  );
}
