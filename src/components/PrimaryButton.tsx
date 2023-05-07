import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const PrimaryButton = ({ children, ...props }: Props) => {
  return (
    <button
      className={"bg-primary text-white px-7 py-3 rounded-3xl font-bold"}
      {...props}
    >
      {children}
    </button>
  );
};
export default PrimaryButton;
