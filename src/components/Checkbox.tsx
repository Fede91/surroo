import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

type Props = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  color: string;
};

export const Checkbox: React.FC<Props> = ({ isChecked, color, onChange }) => {
  return isChecked ? (
    <CheckCircleIcon
      color={color}
      width={"1rem"}
      height={"1rem"}
      minH={"1rem"}
      ml={"0.5rem"}
      onClick={() => onChange(!isChecked)}
    />
  ) : (
    <Box
      width={"1rem"}
      minW={"1rem"}
      height={"1rem"}
      minH={"1rem"}
      borderRadius={"1rem"}
      ml={"0.5rem"}
      borderWidth={"2px"}
      borderColor={color}
      onClick={() => onChange(!isChecked)}
    />
  );
};
