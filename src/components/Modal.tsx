import { DetailedHTMLProps, HTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Modal = ({ children }: Props) => {
  return (
    <div
      className={
        "fixed z-50 top-0 left-0 bg-white sm:bg-white/70 w-screen h-screen sm:flex sm:items-center sm:justify-center"
      }
    >
      {children}
    </div>
  );
};
export default Modal;
