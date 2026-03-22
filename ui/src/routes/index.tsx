import { createFileRoute } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { useCallback } from "react";
import { ReviewsContainer } from "@/components/reviews-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMap } from "@/components/ui/map";
import {
  INITIAL_BEARING,
  INITIAL_CENTER,
  INITIAL_PITCH,
  INITIAL_ZOOM,
} from "@/lib/constants";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  const { map, isLoaded } = useMap();

  const resetMap = useCallback(() => {
    if (map && isLoaded) {
      map.setCenter(INITIAL_CENTER);
      map.setZoom(INITIAL_ZOOM);
      map.setBearing(INITIAL_BEARING);
      map.setPitch(INITIAL_PITCH);
    }
  }, [map, isLoaded]);

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

          <ReviewsContainer />
        </CardContent>
      </Card>
    </div>
  );
}
