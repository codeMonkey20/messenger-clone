import useScrollValue from "@/hooks/useScrollValue";
import { HTMLAttributes } from "react";

const Header = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { scrollY } = useScrollValue();
  return (
    <header
      className="fixed py-8 w-full border-b select-none flex justify-center backdrop-blur-sm"
      style={{ borderBottomColor: `rgba(229,231,235,${scrollY * 0.01})` }}
    >
      <div className={"max-w-[1280px] grow mx-8 flex justify-between"}>
        {children}
      </div>
    </header>
  );
};
export default Header;
