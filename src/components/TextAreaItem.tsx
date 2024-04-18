import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import { Text, Textarea, TextareaProps } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type Props = TextareaProps & {
  onEditItem: (value: string) => void;
};

export const TextAreaItem: React.FC<Props> = ({
  value,
  onEditItem,
  ...otherProps
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState(value);
  const debouncedValue = useDebounce(currentValue, 500);
  useAutosizeTextArea(textAreaRef.current, currentValue);

  useEffect(() => {
    console.log("update");
    onEditItem(String(debouncedValue));
  }, [debouncedValue]);

  return (
    <Textarea
      ref={textAreaRef}
      value={currentValue}
      {...otherProps}
      onChange={(e) => setCurrentValue(e.target.value)}
      resize={"none"}
      style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
      }}
    />
  );
};
