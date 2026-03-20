import { createFileRoute } from "@tanstack/react-router";
import { MainCard } from "@/components/main-card";

export const Route = createFileRoute("/_app")({
  component: MainCard,
});
