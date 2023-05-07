import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <header className={"border-r h-screen w-16 min-w-[4rem] p-2"}>{children}</header>;
};
