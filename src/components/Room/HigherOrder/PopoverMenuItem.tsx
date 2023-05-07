import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const PopoverMenuItem = ({ children, onClick, ...props }: Props) => {
  return (
    <button
      className={
        "flex gap-3 items-center px-3 py-2 rounded-md text-dark text-sm hover:bg-muted/60"
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
export default PopoverMenuItem;
