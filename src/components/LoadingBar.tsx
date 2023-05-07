import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoadingBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <div
      className={
        "fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-primary to-purple-500 animate-pulse transition-all"
      }
      style={{ height: loading ? "3px" : "0px" }}
    />
  );
};
export default LoadingBar;
