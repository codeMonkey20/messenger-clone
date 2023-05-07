import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <div className={"relative px-3 flex justify-between items-center"}>{children}</div>;
};
