import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Card = ({ children }: Props) => {
  return (
    <div className={"bg-white w-72 h-96 rounded-2xl shadow-md"}>{children}</div>
  );
};
export default Card;
