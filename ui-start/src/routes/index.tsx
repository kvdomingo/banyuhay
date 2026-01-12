import { createFileRoute } from "@tanstack/react-router";
import { MainCard } from "@/components/main-card";

export const Route = createFileRoute("/")({ component: Page });

function Page() {
  return <MainCard />;
}
