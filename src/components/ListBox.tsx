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
      borderColor={
        Number(list.color.split(".")[1]) === 900
          ? list.color
          : Number(list.color.split(".")[1]) === 50
          ? `${list.color.split(".")[0]}.${
              Number(list.color.split(".")[1]) + 50
            }`
          : `${list.color.split(".")[0]}.${
              Number(list.color.split(".")[1]) + 100
            }`
      }
    >
      <VStack>
        {list.icon && <Text fontSize={"4xl"}>{list.icon}</Text>}
        <Text>{list.name}</Text>
      </VStack>
    </VStack>
  );
};
