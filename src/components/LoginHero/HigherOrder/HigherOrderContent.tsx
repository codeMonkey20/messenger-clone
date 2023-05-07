import { HTMLAttributes } from "react";

export default ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={"grow max-w-7xl mx-8"}>{children}</div>;
}