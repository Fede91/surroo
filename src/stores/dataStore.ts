import { Item, List, ListTypes } from "@/types";
import { uniqueId } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HydratedDataState {
  lists: List[];
}

export interface DataState extends HydratedDataState {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addList: (list: Partial<List>) => void;
  editList: (list: Partial<List>) => void;
  addItem: (listId: List["id"], text: string) => void;
  editItem: (listId: List["id"], item: Partial<Item>) => void;
  deleteItem: (listId: List["id"], itemId: Item["id"]) => void;
}

const useDataStore = create<
  DataState,
  [["zustand/persist", HydratedDataState]]
>(
  persist(
    (set) => ({
      _hasHydrated: false,
      lists: [],
      setHasHydrated: (state: any) => {
        set({
          _hasHydrated: state,
        });
      },
      addList: (list: Partial<List>) => {
        set((state) => {
          const lists = [...state.lists];

          const items = [];
          if (list.type === ListTypes.TEXT_AREA) {
            items.push({
              id: uniqueId(),
              createdAt: new Date().getTime(),
              text: "",
            });
          }

          lists.push({
            id: uniqueId(),
            createdAt: new Date().getTime(),
            name: list.name,
            color: list.color,
            type: list.type,
            items,
          } as List);

          return { lists };
        });
      },
      editList: (list: Partial<List>) => {
        set((state) => {
          const lists = state.lists.map((l) =>
            l.id === list.id
              ? {
                  ...l,
                  name: String(list.name),
                  type: String(list.type),
                  color: String(list.color),
                }
              : l
          ) as List[];

          return { lists };
        });
      },
      addItem: (listId: List["id"], text: string) => {
        set((state) => {
          const lists = [...state.lists];

          for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === listId) {
              if (!lists[i].items) {
                lists[i].items = [];
              }
              lists[i].items.push({
                id: uniqueId(),
                createdAt: new Date().getTime(),
                text,
              } as Item);

              break;
            }
          }

          return { lists };
        });
      },
      editItem: (listId: List["id"], item: Partial<Item>) => {
        set((state) => {
          const lists = [...state.lists];
          for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === listId) {
              if (!lists[i].items) {
                lists[i].items = [];
              }

              for (let j = 0; j < lists[i].items.length; j++) {
                if (lists[i].items[j].id === item.id) {
                  if (typeof item.text !== "undefined") {
                    lists[i].items[j].text = String(item.text);
                  }

                  if (typeof item.isCompleted !== "undefined") {
                    lists[i].items[j].isCompleted = item.isCompleted;
                  }

                  break;
                }
              }
            }
          }

          return { lists };
        });
      },
      deleteItem: (listId: List["id"], itemId: Item["id"]) => {
        set((state) => {
          const lists = [...state.lists];

          for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === listId) {
              if (!lists[i].items) {
                lists[i].items = [];
              }

              lists[i].items = lists[i].items.filter((i) => i.id !== itemId);
            }
          }

          return { lists };
        });
      },
    }),
    {
      name: "data",
      version: 0,
      partialize: (state: DataState) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["_hasHydrated"].includes(key)
          )
        ) as HydratedDataState,
      onRehydrateStorage: (_: DataState): any => {
        return (state: DataState) => {
          state.setHasHydrated(true);
        };
      },
    }
  )
);

export default useDataStore;
