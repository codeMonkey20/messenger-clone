import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className={"border-r h-screen w-16 min-w-[4rem] p-2 hidden sm:block"}>
      {children}
    </header>
  );
};
export default Header;
