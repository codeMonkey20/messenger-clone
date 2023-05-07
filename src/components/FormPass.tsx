import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
{}

export default ({ ...props }: Props) => {
  return <input type={"password"} className={"rounded-xl bg-gray-100 px-3 py-2"} {...props} />;
};
