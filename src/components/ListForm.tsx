// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import {
  Button,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { ColorPicker } from "./ColorPicker";
import { List, ListTypes } from "@/types";
import { useState } from "react";

type Props = {
  list?: List;
  onSubmit: (data: Partial<List>) => void;
};

// const formSchema = z.object({
//   name: z.string().min(1).max(150),
//   color: z.string().min(1).max(150),
//   type: z.string().min(1).max(150),
// });

export const ListForm: React.FC<Props> = ({ list, onSubmit }) => {
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
    onSubmit({ name, color, type });
  }

  return (
    <VStack>
      <form>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <ColorPicker color={color} onChange={setColor} />

        <RadioGroup onChange={(v) => setType(v as ListTypes)} value={type}>
          <Stack direction="row">
            <Radio value={ListTypes.BULLET_LIST}>Bullet list</Radio>
            <Radio value={ListTypes.CHECK_LIST}>Check list</Radio>
            <Radio value={ListTypes.TEXT_AREA}>Text area</Radio>
          </Stack>
        </RadioGroup>

        <HStack>
          <Button variant="outline" mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};
