import { getRouteApi } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useMap } from "./ui/map";

const Route = getRouteApi("__root__");

export function MapStateUpdater() {
  const { map } = useMap();
  const navigate = Route.useNavigate();

  const updateBounds = useCallback(() => {
    if (map) {
      navigate({
        search: {
          min_lng: map.getBounds().getWest(),
          max_lng: map.getBounds().getEast(),
          min_lat: map.getBounds().getSouth(),
          max_lat: map.getBounds().getNorth(),
        },
        replace: true,
      });
    }
  }, [map, navigate]);

  useEffect(() => {
    if (map) {
      map.on("load", updateBounds);
      map.on("moveend", updateBounds);
      map.on("zoomend", updateBounds);
      map.on("pitchend", updateBounds);
      map.on("rotateend", updateBounds);
    }

    return () => {
      if (map) {
        map.off("load", updateBounds);
        map.off("moveend", updateBounds);
        map.off("zoomend", updateBounds);
        map.off("pitchend", updateBounds);
        map.off("rotateend", updateBounds);
      }
    };
  }, [map, updateBounds]);

  return null;
}
