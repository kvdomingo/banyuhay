import { createLazyFileRoute } from "@tanstack/react-router";
import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const initialZoom = 9;
  const initialCenter: LatLngTuple = [15, 121];

  return (
    <div className="flex">
      <div className="w-1/3 h-dvh px-8">
        <h1 className="text-3xl my-8">Banyuhay</h1>
        <p>Why?</p>
      </div>

      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom
        className="w-full h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
