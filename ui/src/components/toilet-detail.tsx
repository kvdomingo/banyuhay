import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { MilkOff, SprayCan, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reviews } from "./reviews";

type ToiletGeometry = { lat: number; lng: number };

interface Toilet {
  id: string;
  establishment_name: string;
  location_information: string;
  geometry: ToiletGeometry;
  has_bidet: boolean;
  avg_rating_water_pressure: number;
  avg_rating_cleanliness: number;
  avg_rating_poopability: number;
  total_reviews: number;
}

export function ToiletDetail() {
  const { toiletId } = useParams({ from: "/_app/$toiletId" });

  const { data: toilets } = useQuery<Toilet[]>({
    queryKey: ["toilets"],
    queryFn: async () => {
      const res = await fetch("/api/toilets", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch toilets");
      return res.json();
    },
  });

  const toilet = toilets?.find((t) => t.id === toiletId);

  if (!toilet) return null;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-2xl">{toilet.establishment_name}</h2>
        <p className="text-gray-400">{toilet.location_information}</p>
      </div>
      <div className="flex items-center gap-2">
        {toilet.has_bidet ? <SprayCan /> : <MilkOff />}
        <p
          className={cn("font-semibold", {
            "text-green-500": toilet.has_bidet,
            "text-red-500": !toilet.has_bidet,
          })}
        >
          {toilet.has_bidet ? "May bidet!" : "Walang bidet!"}
        </p>
      </div>
      <div>
        <p className="flex items-center gap-1">
          Water Pressure:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_water_pressure.toFixed(1)}
        </p>
        <p className="flex items-center gap-1">
          Cleanliness:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_cleanliness.toFixed(1)}
        </p>
        <p className="flex items-center gap-1">
          Poopability:
          <Star size="1rem" className="fill-amber-500 text-amber-500" />
          {toilet.avg_rating_poopability.toFixed(1)}
        </p>
      </div>

      <Reviews toiletId={toiletId} />
    </div>
  );
}
