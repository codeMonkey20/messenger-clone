import { HTMLAttributes } from "react";

export default ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div>{children}</div>;
}