import { Outlet } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { env } from "@/env";
import {
  INITIAL_BEARING,
  INITIAL_CENTER,
  INITIAL_PITCH,
  INITIAL_ZOOM,
} from "@/lib/constants";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useMap } from "./ui/map";

export function MainCard() {
  const { map } = useMap();

  const [center, setCenter] = useState(map?.getCenter() ?? INITIAL_CENTER);
  const [zoom, setZoom] = useState(map?.getZoom() ?? INITIAL_ZOOM);
  const [bearing, setBearing] = useState(map?.getBearing() ?? INITIAL_BEARING);
  const [pitch, setPitch] = useState(map?.getPitch() ?? INITIAL_PITCH);
  const [bbox, setBbox] = useState(map?.getBounds().toString() ?? null);

  const onMove = useCallback(() => {
    setCenter(map?.getCenter() ?? INITIAL_CENTER);
    setBbox(map?.getBounds().toString() ?? null);
  }, [map]);

  const onZoom = useCallback(() => {
    setZoom(map?.getZoom() ?? INITIAL_ZOOM);
    setBbox(map?.getBounds().toString() ?? null);
  }, [map]);

  const onRotate = useCallback(() => {
    setBearing(map?.getBearing() ?? INITIAL_BEARING);
    setBbox(map?.getBounds().toString() ?? null);
  }, [map]);

  const onPitch = useCallback(() => {
    setPitch(map?.getPitch() ?? INITIAL_PITCH);
    setBbox(map?.getBounds().toString() ?? null);
  }, [map]);

  const resetMap = useCallback(() => {
    map?.setCenter(INITIAL_CENTER);
    map?.setZoom(INITIAL_ZOOM);
    map?.setBearing(INITIAL_BEARING);
    map?.setPitch(INITIAL_PITCH);
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on("move", onMove);
    map.on("zoom", onZoom);
    map.on("rotate", onRotate);
    map.on("pitch", onPitch);

    return () => {
      map.off("move", onMove);
      map.off("zoom", onZoom);
      map.off("rotate", onRotate);
      map.off("pitch", onPitch);
    };
  }, [map, onMove, onZoom, onRotate, onPitch]);

  return (
    <div className="fixed top-0 left-0 m-4 max-h-dvh w-1/3 font-sans">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl">Banyuhay</CardTitle>
          <CardDescription>
            <p>
              n. compound word lit. <i>bagong anyong buhay</i> (metamorphosis)
            </p>
            <p>
              Also referred to in jest as <i>banyo ng buhay</i> (lit. toilet of life)
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" size="icon" onClick={resetMap}>
            <HomeIcon />
          </Button>

          <Outlet />

          {env.DEV && (
            <div className="text-gray-400 text-xs">
              <p>lat: {center.lat.toFixed(5)}</p>
              <p>lng: {center.lng.toFixed(5)}</p>
              <p>zoom: {zoom.toFixed(5)}</p>
              <p>bearing: {bearing.toFixed(5)}</p>
              <p>pitch: {pitch.toFixed(5)}</p>
              <p>bbox: {bbox}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
