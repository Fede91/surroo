import { AddIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  height: number | string;
  onClick: () => void;
};

export type Ref = any;

const AddListBox = forwardRef<Ref, Props>(({ height, onClick }, ref) => {
  return (
    <VStack
      height={height}
      borderStyle={"dashed"}
      borderWidth={"0.125rem"}
      borderRadius={"2rem"}
      alignContent={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={onClick}
    >
      <AddIcon boxSize={6} opacity={"0.6"} />
    </VStack>
  );
});

AddListBox.displayName = "AddListBox";

export default AddListBox;
