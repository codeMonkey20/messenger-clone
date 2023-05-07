import { useEffect, useState } from "react";

export default function usePageFocus() {
  const [isPageFocus, setIsPageFocus] = useState(false);

  useEffect(() => {
    setIsPageFocus(typeof document !== "undefined" && document.hasFocus()); // Focus for additional renders

    const onFocus = () => setIsPageFocus(true);
    const onBlur = () => setIsPageFocus(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return isPageFocus;
}
