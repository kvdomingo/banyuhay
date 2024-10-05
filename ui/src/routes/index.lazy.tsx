import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LatLng } from "leaflet";
import { Home } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const INITIAL_ZOOM = 11;
const INITIAL_CENTER = new LatLng(14.56, 121.04);

function MainCard() {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  const [position, setPosition] = useState(map.getCenter());

  const { lat, lng } = position;

  const resetMap = useCallback(() => {
    map.setView(INITIAL_CENTER, INITIAL_ZOOM);
  }, [map]);

  const onMove = useCallback(() => setPosition(map.getCenter()), [map]);

  const onZoom = useCallback(() => setZoom(map.getZoom()), [map]);

  // biome-ignore lint/correctness/useExhaustiveDependencies(map.on):
  // biome-ignore lint/correctness/useExhaustiveDependencies(map.off):
  // biome-ignore lint/correctness/useExhaustiveDependencies(onMove):
  // biome-ignore lint/correctness/useExhaustiveDependencies(onZoom):
  useEffect(() => {
    map.on("move", onMove);
    map.on("zoom", onZoom);

    return () => {
      map.off("move", onMove);
      map.off("zoom", onZoom);
    };
  }, []);

  return (
    <Card
      className="fixed top-0 left-0 z-[400] m-4 w-1/4"
      onMouseEnter={() => map.dragging.disable()}
      onMouseLeave={() => map.dragging.enable()}
    >
      <CardHeader>
        <CardTitle className="text-4xl">Banyuhay</CardTitle>
        <CardDescription>
          <p>
            n. compound word lit. <i>bagong anyong buhay</i> (metamorphosis)
          </p>
          <p>
            Also jokingly referred to as <i>banyo ng buhay</i> (lit. toilet of life)
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="icon" className="mb-4" onClick={resetMap}>
          <Home />
        </Button>
        {import.meta.env.DEV && (
          <>
            <p>lat: {lat.toFixed(5)}</p>
            <p>lng: {lng.toFixed(5)}</p>
            <p>zoom: {zoom}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Index() {
  const displayMap = useMemo(
    () => (
      <MapContainer
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        scrollWheelZoom
        zoomControl={false}
        className="h-dvh w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        <MainCard />
      </MapContainer>
    ),
    [],
  );

  return <>{displayMap}</>;
}
