import { useState, useEffect, useRef, useCallback } from "react";

export default function useHover<T extends HTMLElement = HTMLDivElement>() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);
  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  useEffect(() => {
    if (ref.current) {
      const currentRef = ref.current;
      currentRef.addEventListener("mouseenter", onMouseEnter);
      currentRef.addEventListener("mouseleave", onMouseLeave);

      return () => {
        currentRef?.removeEventListener("mouseenter", onMouseEnter);
        currentRef?.removeEventListener("mouseleave", onMouseLeave);
      };
    }

    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, hovered };
}
