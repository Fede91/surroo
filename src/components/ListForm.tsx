// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorPicker } from "./ColorPicker";
import { List, ListTypes } from "@/types";
import { useState } from "react";

type Props = {
  list?: List;
  onSubmit: (data: Partial<List>) => void;
  onCancel: () => void;
};

// const formSchema = z.object({
//   name: z.string().min(1).max(150),
//   color: z.string().min(1).max(150),
//   type: z.string().min(1).max(150),
// });

export const ListForm: React.FC<Props> = ({ list, onSubmit, onCancel }) => {
  const [icon, setIcon] = useState(list?.icon || "");
  const [name, setName] = useState(list?.name || "");
  const [color, setColor] = useState(list?.color || "green.100");
  const [type, setType] = useState(list?.type || ListTypes.BULLET_LIST);

  /*const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "green.100",
      type: ListTypes.BULLET_LIST,
    },
  });*/

  function handleSubmit() {
    onSubmit(
      list ? { ...list, name, color, type, icon } : { name, color, type, icon }
    );
  }

  return (
    <VStack paddingBottom={"1rem"} gap={"1rem"}>
      {/* <form> */}
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </FormControl>
      <Stack flexDirection="row" justifyContent={"space-between"} w={"100%"}>
        <Stack>
          <Text fontWeight={500}>Theme</Text>

          <ColorPicker color={color} onChange={setColor} />
        </Stack>
        <FormControl w={"8rem"}>
          <FormLabel>Emoji</FormLabel>
          <Input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder={"Emoji"}
            w={"8rem"}
          />
        </FormControl>
      </Stack>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup
          onChange={(v) => setType(v as ListTypes)}
          value={type}
          colorScheme={color.split(".")[0]}
          size="lg"
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Stack direction="row">
            <Radio value={ListTypes.BULLET_LIST}>Bullet list</Radio>
            <Radio value={ListTypes.CHECK_LIST}>Check list</Radio>
            <Radio value={ListTypes.TEXT_AREA}>Text area</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <HStack justifyContent={"space-between"} w={"100%"} mt={"2rem"}>
        <Button variant="ghost" mr={3} size="lg" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          colorScheme={color.split(".")[0]}
          onClick={handleSubmit}
          size="lg"
        >
          Save
        </Button>
      </HStack>
      {/* </form> */}
    </VStack>
  );
};
