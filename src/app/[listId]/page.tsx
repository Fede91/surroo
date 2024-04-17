"use client";

import { AddItemInput } from "@/components/AddItemInput";
import { AutosizeTextArea } from "@/components/AutosizeTextArea";
import { Checkbox } from "@/components/Checkbox";
import { EditableItem } from "@/components/EditableItem";
import { ListForm } from "@/components/ListForm";
import { TextAreaItem } from "@/components/TextAreaItem";
import useDataStore from "@/stores/dataStore";
import { ListTypes } from "@/types";
import {
  AddIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  EditIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import SwipeToDelete from "react-swipe-to-delete-ios";

export default function ListDetails() {
  const params = useParams<{ listId: string }>();
  const router = useRouter();
  const [isNewItemVisible, setIsNewItemVisible] = useState(false);
  const editBtnRef = useRef();

  const addItem = useDataStore((state) => state.addItem);

  const [text, setText] = useState("");

  const {
    isOpen: isEditListModalVisible,
    onOpen: onEditListModalOpen,
    onClose: onEditListModalClose,
  } = useDisclosure();

  const list = useDataStore((state) =>
    state.lists.find((l) => l.id === params.listId)
  );
  const editList = useDataStore((state) => state.editList);
  const editItem = useDataStore((state) => state.editItem);
  const deleteItem = useDataStore((state) => state.deleteItem);

  const handleAddItem = () => {
    if (text.length > 0) {
      addItem(params.listId, text);
      setText("");
    }
    setIsNewItemVisible(false);
  };

  console.log({ list });

  if (!list) {
    return null;
  }

  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      bgGradient={`linear(to-b, ${list.color}, ${list.color.split(".")[0]}.${
        list.color.split(".")[1] === "100"
          ? "50"
          : Number(list.color.split(".")[1]) - 100
      } )`}
    >
      <HStack justifyContent={"space-between"} h={"4rem"}>
        <HStack>
          <IconButton
            isRound={true}
            variant="ghost"
            aria-label="Back"
            fontSize="20px"
            icon={<ChevronLeftIcon />}
            onClick={() => router.push("/")}
          />
          <Heading as="h4" size="md">
            {list.name}
          </Heading>
        </HStack>
        <IconButton
          isRound={true}
          variant="ghost"
          aria-label="Settings"
          fontSize="20px"
          icon={<SettingsIcon />}
          // @ts-ignore
          ref={editBtnRef}
          onClick={onEditListModalOpen}
        />
      </HStack>

      <Flex
        flexDir={"column"}
        paddingBottom={"6rem"}
        h={"calc(100vh - 4rem)"}
        overflowY={"auto"}
        paddingX={"1rem"}
      >
        {[ListTypes.BULLET_LIST, ListTypes.CHECK_LIST].includes(list.type) ? (
          <Stack spacing={2} direction="column">
            {(list.items || []).map((item) => (
              <SwipeToDelete
                key={item.id}
                onDelete={() => deleteItem(list.id, item.id)} // required
                // optional
                transitionDuration={250} // default
                deleteWidth={75} // default
                //deleteThreshold={75} // default
                //showDeleteAction={true} //default
                deleteColor="#C53030"
                deleteText="Delete" // default
                //deleteComponent={<DeleteComponent />} // not default
                disabled={false} // default
                id="swiper-1" // not default
                rtl={false} // default
                className="list-item-swiper"
                onDeleteConfirm={(onSuccess: any, onCancel: any) => {
                  // not default - default is null
                  if (
                    window.confirm("Do you really want to delete this item ?")
                  ) {
                    onSuccess();
                  } else {
                    onCancel();
                  }
                }}
              >
                <HStack
                  backgroundColor={`${list.color.split(".")[0]}.${
                    list.color.split(".")[1] === "100"
                      ? "100"
                      : Number(list.color.split(".")[1]) - 100
                  }`}
                  h="100%"
                  minH={"3rem"}
                >
                  {list.type === ListTypes.CHECK_LIST ? (
                    <Checkbox
                      color={`${list.color.split(".")[0]}.600`}
                      isChecked={Boolean(item.isCompleted)}
                      onChange={(isChecked) => {
                        editItem(list.id, {
                          id: item.id,
                          isCompleted: isChecked,
                        });
                      }}
                    />
                  ) : (
                    <Box
                      backgroundColor={`${list.color.split(".")[0]}.600`}
                      width={"1rem"}
                      minW={"1rem"}
                      height={"1rem"}
                      minH={"1rem"}
                      borderRadius={"1rem"}
                      ml={"0.5rem"}
                    />
                  )}
                  <EditableItem
                    value={item.text}
                    onChange={(value) =>
                      editItem(list.id, { id: item.id, text: value })
                    }
                  />
                </HStack>
              </SwipeToDelete>
            ))}
          </Stack>
        ) : list.type === ListTypes.TEXT_AREA ? (
          <TextAreaItem
            placeholder="Write here your note..."
            value={list.items[0].text}
            onEditItem={(value) =>
              editItem(list.id, { id: list.items[0].id, text: value })
            }
          />
        ) : null}

        {isNewItemVisible && (
          <HStack
            backgroundColor={`${list.color.split(".")[0]}.${
              list.color.split(".")[1] === "100"
                ? "100"
                : Number(list.color.split(".")[1]) - 100
            }`}
            mt={"0.5rem"}
            borderRadius={"0.5rem"}
          >
            <Box width={"1rem"} minW={"1rem"} ml={"0.5rem"} />
            <AddItemInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={() => handleAddItem()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddItem();
                }
              }}
            />
          </HStack>
        )}
      </Flex>

      {[ListTypes.BULLET_LIST, ListTypes.CHECK_LIST].includes(list.type) &&
        !isNewItemVisible && (
          <Button
            rightIcon={<AddIcon />}
            colorScheme={list.color.split(".")[0]}
            size="md"
            position="fixed"
            bottom="2rem"
            left="52vw"
            transform="translate(-50%)"
            onClick={() => {
              setIsNewItemVisible(true);
            }}
          >
            Add
          </Button>
        )}
      <Drawer
        isOpen={isEditListModalVisible}
        placement="bottom"
        onClose={onEditListModalClose}
        // @ts-ignore
        finalFocusRef={editBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit memo list</DrawerHeader>

          <DrawerBody>
            <ListForm list={list} onSubmit={editList} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
