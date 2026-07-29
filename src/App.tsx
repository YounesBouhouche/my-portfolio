import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import { Outlet, ScrollRestoration, useRouterState } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import LoadingOverlay from "./components/shared/LoadingOverlay";

const CommandPalette = lazy(() => import("./components/shared/CommandPalette"));

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
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
      <ScrollRestoration />
    </>
  );
}

export default App;
