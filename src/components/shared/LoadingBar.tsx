import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import "./LoadingBar.css";

export function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleEnd = () => setIsLoading(false);

    const unsubscribe = router.subscribe("onBeforeLoad", () => {
      handleStart();
    });

    const unsubscribeEnd = router.subscribe("onLoad", () => {
      handleEnd();
    });

    return () => {
      unsubscribe();
      unsubscribeEnd();
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="loading-bar-container">
      <div className="loading-bar"></div>
    </div>
  );
}
