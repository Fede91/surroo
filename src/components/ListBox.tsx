import { List } from "@/types";
import { AddIcon } from "@chakra-ui/icons";
import { Text, VStack } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  list: List;
  height: number | string;
  onClick: () => void;
};

export const ListBox: React.FC<Props> = ({ list, height, onClick }) => {
  return (
    <VStack
      height={height}
      borderWidth={"0.125rem"}
      borderRadius={"2rem"}
      alignContent={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={onClick}
      backgroundColor={list.color}
    >
      <Text>{list.name}</Text>
    </VStack>
  );
};
