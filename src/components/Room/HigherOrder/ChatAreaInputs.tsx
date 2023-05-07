import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return <div className={"p-3 flex items-center gap-1 text-primary"}>{children}</div>;
};
