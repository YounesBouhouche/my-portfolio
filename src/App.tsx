import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { Outlet, ScrollRestoration, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "./App.css";
import CommandPalette from "./components/shared/CommandPalette";
import LoadingOverlay from "./components/shared/LoadingOverlay";

function App() {
  const routerState = useRouterState();
  const isRouteLoading = routerState.isLoading;
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Remove overlay immediately — route transitions are handled by isRouteLoading
    setIsInitialLoad(false);
  }, []);

  const showOverlay = isInitialLoad || isRouteLoading;

  return (
    <>
      <LoadingOverlay visible={showOverlay} size={200} />
      <NavBar />
      <Outlet />
      <Footer />
      <CommandPalette />
      <ScrollRestoration />
    </>
  );
}

export default App;
