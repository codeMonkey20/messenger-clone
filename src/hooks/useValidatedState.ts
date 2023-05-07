import { useState } from "react";

export default <T>(
  initialValue: T,
  validation: (value: T) => boolean,
  initialValidationState?: boolean
) => {
  const [value, setValue] = useState<T>(initialValue);
  const [valid, setValid] = useState<boolean>(
    typeof initialValidationState === "boolean"
      ? initialValidationState
      : validation(initialValue)
  );

  const onChange = (val: T) => {
    if (validation(val)) {
      setValid(true);
    } else {
      setValid(false);
    }

    setValue(val);
  };

  return [{ value, valid }, onChange] as const;
};
