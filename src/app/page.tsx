"use client";

import AddListBox from "@/components/AddListBox";
import { ListBox } from "@/components/ListBox";
import { ListForm } from "@/components/ListForm";
import useDataStore from "@/stores/dataStore";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const CELLS_H = "25vh";

export default function Home() {
  const lists = useDataStore((state) => state.lists);
  const addList = useDataStore((state) => state.addList);
  const _hasHydrated = useDataStore((state) => state._hasHydrated);
  const router = useRouter();
  const btnRef = useRef();

  const {
    isOpen: isNewListModalVisible,
    onOpen: onNewListModalOpen,
    onClose: onNewListModalClose,
  } = useDisclosure();

  if (!_hasHydrated) {
    return null;
  }

  return (
    <main style={{ padding: "1rem" }}>
      <SimpleGrid columns={[2, null, 3]} spacing="1rem">
        {lists.map((list) => (
          <ListBox
            key={list.id}
            list={list}
            height={CELLS_H}
            onClick={() => router.push(`/${list.id}`)}
          />
        ))}

        <AddListBox
          height={CELLS_H}
          onClick={onNewListModalOpen}
          ref={btnRef}
        />
      </SimpleGrid>

      <Drawer
        isOpen={isNewListModalVisible}
        placement="bottom"
        onClose={onNewListModalClose}
        // @ts-ignore
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new memo list</DrawerHeader>

          <DrawerBody>
            <ListForm onSubmit={addList} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </main>
  );
}
