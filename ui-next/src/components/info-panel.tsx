import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function InfoPanel() {
  return (
    <Card className="fixed top-0 left-0 m-4 w-1/4">
      <CardHeader>
        <CardTitle className="text-4xl">Banyuhay</CardTitle>
        <CardDescription>
          <p>
            n. compound word lit. <i>bagong anyong buhay</i> (metamorphosis)
          </p>
          <p>
            Also referred to in jest as <i>banyo ng buhay</i> (lit. toilet of
            life)
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
