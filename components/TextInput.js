import React, { useRef, useEffect } from "react";

const noOp = () => undefined;

export function TextInput(props) {
  const { autofocus, value, onChange, isFloat, isInt, ...otherProps } = props;
  const onTextChange = event => {
    const value = event && event.target && event.target.value;
    onChange(isFloat ? parseFloat(value) : isInt ? parseInt(value) : value);
  };
  const theInput = useRef({ focus: noOp });

  useEffect(() => {
    if (autofocus) theInput.current.focus();
  }, [autofocus]);

  return (
    <input
      className="form-control"
      {...otherProps}
      ref={theInput}
      type="text"
      value={value || ""}
      onChange={onTextChange}
    />
  );
}
