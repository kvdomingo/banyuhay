import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { MapPin, MapPinX } from "lucide-react";
import type { LngLatBounds } from "maplibre-gl";
import qs from "qs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MapMarker, MarkerContent, useMap } from "./ui/map";

type ToiletGeometry = { lat: number; lng: number };

interface Toilet {
  id: string;
  geometry: ToiletGeometry;
  has_bidet: boolean;
}

function stringifyBbox(bounds: LngLatBounds): string {
  const nw = bounds.getNorthWest();
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  const se = bounds.getSouthEast();

  return qs.stringify({
    nw: [nw.lat, nw.lng],
    ne: [ne.lat, ne.lng],
    sw: [sw.lat, sw.lng],
    se: [se.lat, se.lng],
  });
}

export function Markers() {
  const { map, isLoaded } = useMap();
  const navigate = useNavigate();
  const { toiletId: currentToiletId } = useParams({ strict: false });

  const [bounds, setBounds] = useState<LngLatBounds | null>(
    () => map?.getBounds() ?? null,
  );

  const handleMapChange = useCallback(() => {
    setBounds(map?.getBounds() ?? null);
  }, [map]);

  useEffect(() => {
    if (!map || !isLoaded) return;
    map.on("moveend", handleMapChange);
    map.on("zoomend", handleMapChange);
    map.on("pitchend", handleMapChange);
    map.on("rotateend", handleMapChange);
    return () => {
      map.off("moveend", handleMapChange);
      map.off("zoomend", handleMapChange);
      map.off("pitchend", handleMapChange);
      map.off("rotateend", handleMapChange);
    };
  }, [map, isLoaded, handleMapChange]);

  const bboxString = useMemo(
    () => (bounds ? stringifyBbox(bounds) : undefined),
    [bounds],
  );

  const { data: toilets } = useQuery<Toilet[]>({
    queryKey: ["toilets", bboxString],
    queryFn: async () => {
      const url = bboxString
        ? `/api/toilets?bbox=${encodeURIComponent(bboxString)}`
        : "/api/toilets";
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch toilets");
      return res.json();
    },
    enabled: isLoaded,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      {toilets?.map((toilet) => {
        const isSelected = toilet.id === currentToiletId;
        return (
          <MapMarker
            key={toilet.id}
            longitude={toilet.geometry.lng}
            latitude={toilet.geometry.lat}
            onClick={() => {
              if (isSelected) {
                navigate({ to: "/" });
              } else {
                navigate({ to: "/$toiletId", params: { toiletId: toilet.id } });
              }
            }}
          >
            <MarkerContent
              className={cn("flex items-center justify-center rounded-full", {
                "h-16 w-16": isSelected,
                "h-8 w-8": !isSelected,
              })}
            >
              {toilet.has_bidet ? (
                <MapPin
                  className={cn("fill-sky-500 transition-all duration-100", {
                    "fill-amber-300": isSelected,
                  })}
                  size={isSelected ? "4rem" : "2rem"}
                />
              ) : (
                <MapPinX
                  className={cn("fill-red-600 transition-all duration-100", {
                    "fill-amber-300": isSelected,
                  })}
                  size={isSelected ? "4rem" : "2rem"}
                />
              )}
            </MarkerContent>
          </MapMarker>
        );
      })}
    </>
  );
}
