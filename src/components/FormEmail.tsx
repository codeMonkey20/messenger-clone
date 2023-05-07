import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const FormEmail = ({ ...props }: Props) => {
  return (
    <input
      type={"email"}
      className={"rounded-xl bg-gray-100 px-3 py-2"}
      {...props}
    />
  );
};
export default FormEmail;
