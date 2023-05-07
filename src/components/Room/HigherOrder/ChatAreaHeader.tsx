import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <div className={"w-full p-3 flex justify-between shadow"}>{children}</div>;
};
