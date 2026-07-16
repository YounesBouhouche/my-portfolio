import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import "./App.css";
import CommandPalette from "./components/shared/CommandPalette";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <CommandPalette />
      <ScrollRestoration />
    </>
  );
}

export default App;
