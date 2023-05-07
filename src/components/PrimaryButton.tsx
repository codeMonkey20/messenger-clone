import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export default ({ children, ...props }: Props) => {
  return (
    <button
      className={"bg-primary text-white px-7 py-3 rounded-3xl font-bold"}
      {...props}
    >
      {children}
    </button>
  );
};
