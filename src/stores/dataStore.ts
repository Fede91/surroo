import { List } from "@/types";
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

          lists.push({
            id: uniqueId(),
            createdAt: new Date().getTime(),
            name: list.name,
            color: list.color,
            type: list.type,
          } as List);

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
