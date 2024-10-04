import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="w-full h-dvh flex items-center justify-center text-5xl">
      <h1>Banyuhay</h1>
    </div>
  ),
});
