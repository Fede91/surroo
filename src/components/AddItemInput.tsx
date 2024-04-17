import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { Input, InputProps, Textarea, TextareaProps } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

type Props = TextareaProps;

export const AddItemInput: React.FC<Props> = ({ value, ...otherProps }) => {
  const inputTextRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(inputTextRef.current, value);

  useEffect(() => {
    if (inputTextRef.current) {
      inputTextRef.current.focus();
    }
  }, []);

  return (
    <Textarea
      ref={inputTextRef}
      value={value}
      {...otherProps}
      resize={"none"}
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
      }}
    />
  );
};
