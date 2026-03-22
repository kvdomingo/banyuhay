import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { MapPin, MapPinX } from "lucide-react";
import { orpc } from "@/api";
import { cn } from "@/lib/utils";
import { MapMarker, MarkerContent } from "./ui/map";

const Route = getRouteApi("/");

export function Markers() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const currentToiletId = search?.toilet_id;

  const { data: toilets = [] } = useQuery(
    orpc.toilet.list.queryOptions({
      input: {
        min_lng: search?.min_lng ?? 0,
        max_lng: search?.max_lng ?? 0,
        min_lat: search?.min_lat ?? 0,
        max_lat: search?.max_lat ?? 0,
      },
      placeholderData: keepPreviousData,
      enabled: search && [Object.values(search)].every(Boolean),
    }),
  );

  return (
    <>
      {toilets.map((toilet) => {
        const isSelected = toilet.id === currentToiletId;
        return (
          <MapMarker
            key={toilet.id}
            longitude={toilet.geometry.lng}
            latitude={toilet.geometry.lat}
            onClick={() => {
              if (isSelected) {
                navigate({ search: { toilet_id: undefined }, replace: true });
              } else {
                navigate({ search: { toilet_id: toilet.id }, replace: true });
              }
            }}
          >
            <MarkerContent className="flex items-center justify-center rounded-full">
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
