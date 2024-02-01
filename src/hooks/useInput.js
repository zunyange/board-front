// blog_front

import { forwardRef, useState } from "react";

const UseInput = (initValue) => {
  const [value, setValue] = useState(initValue || "");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const Input = forwardRef((props, ref) => {
    const [isPw, setIsPw] = useState(props.password || false);

    // Define the rest of your Input component logic here...
    // You can access isPw and setIsPw as needed

    return (
      // Return your input JSX here
      <input type={isPw ? "password" : "text"} ref={ref} {...props} />
    );
  });

  return { value, setValue, onChange, Input };
};
export default UseInput;
