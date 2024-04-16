import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";

type Props = {
  color?: string;
  onChange: (color: string) => void;
};

export const ColorPicker: React.FC<Props> = ({ color = "white", onChange }) => {
  const colors = [
    "green.100",
    "green.200",
    "green.300",
    "green.400",
    "teal.100",
    "teal.200",
    "teal.300",
    "teal.400",
    "yellow.100",
    "yellow.200",
    "yellow.300",
    "yellow.400",
    "orange.100",
    "orange.200",
    "orange.300",
    "orange.400",
    "red.100",
    "red.200",
    "red.300",
    "red.400",
    "cyan.100",
    "cyan.200",
    "cyan.300",
    "cyan.400",
    "blue.100",
    "blue.200",
    "blue.300",
    "blue.400",
    "purple.100",
    "purple.200",
    "purple.300",
    "purple.400",
    "pink.100",
    "pink.200",
    "pink.300",
    "pink.400",
  ];

  return (
    <Popover variant="picker">
      <PopoverTrigger>
        <Button
          aria-label={color}
          background={color}
          height="2rem"
          width="2rem"
          padding={0}
          minWidth="unset"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="12rem">
        <PopoverArrow bg={color} />
        {/* <PopoverCloseButton color="white" /> */}
        {/* <PopoverHeader
          height="100px"
          backgroundColor={color}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color="white"
        >
          <Center height="100%">{color}</Center>
        </PopoverHeader> */}
        <PopoverBody height="23rem">
          <SimpleGrid columns={4} spacing={2}>
            {colors.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="2rem"
                width="2rem"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  onChange(c);
                }}
              ></Button>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
