import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { useRef } from "react";

type Props = TextareaProps;

export const AutosizeTextArea: React.FC<Props> = ({ value, ...otherProps }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <Textarea
      ref={textAreaRef}
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
