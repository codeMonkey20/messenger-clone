import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default ({ ...props }: Props) => {
  return (
    <input
      className={"w-full h-9 bg-muted/50 rounded-3xl px-3 outline-none "}
      placeholder={"Search"}
      {...props}
    />
  );
};
