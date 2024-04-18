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
            icon: list.icon,
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
                  icon: String(list.icon),
                  updatedAt: new Date().getTime(),
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

              lists[i].updatedAt = new Date().getTime();

              break;
            }
          }

          return { lists };
        });
      },
      editItem: (listId: List["id"], item: Partial<Item>) => {
        set((state) => {
          const lists = state.lists.map((list) => {
            if (list.id === listId) {
              const _list = {
                ...list,
                items: (list.items || []).map((listItem) => {
                  if (listItem.id === item.id) {
                    const obj = { ...listItem };

                    if (typeof item.text !== "undefined") {
                      obj.text = String(item.text);
                    }

                    if (typeof item.isCompleted !== "undefined") {
                      obj.isCompleted = item.isCompleted;
                    }

                    return obj;
                  } else {
                    return listItem;
                  }
                }),
              };
              return _list;
            } else {
              return list;
            }
          });

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
