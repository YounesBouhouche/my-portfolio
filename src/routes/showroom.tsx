import { createFileRoute } from "@tanstack/react-router";
import Showroom from "../components/routes/Showroom";

export const Route = createFileRoute("/showroom")({
  component: Showroom,
});
