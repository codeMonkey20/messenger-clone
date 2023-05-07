import { useEffect, useState } from "react";

export default () => {
  const [scroll, setScroll] = useState({ scrollY: 0, scrollX: 0 });
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll({ scrollY: window.scrollY, scrollX: window.scrollX });
    });
  }, []);
  return scroll;
};
