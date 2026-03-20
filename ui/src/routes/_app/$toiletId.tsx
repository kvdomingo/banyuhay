import { createFileRoute } from "@tanstack/react-router";
import { ToiletDetail } from "@/components/toilet-detail";

export const Route = createFileRoute("/_app/$toiletId")({
  component: ToiletDetail,
});
