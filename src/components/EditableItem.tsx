import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { AutosizeTextArea } from "./AutosizeTextArea";
import { Item } from "@/types";

type Props = {
  value: Item["text"];
  onChange: (value: string) => void;
};

export const EditableItem: React.FC<Props> = ({ value, onChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  return isEditMode ? (
    <AutosizeTextArea
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={() => {
        onChange(currentValue);
        setIsEditMode(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onChange(currentValue);
          setIsEditMode(false);
        }
      }}
    />
  ) : (
    <Text onDoubleClick={() => setIsEditMode(true)}>{value}</Text>
  );
};
