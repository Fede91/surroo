export type Item = {
  id: string;
  createdAt: number;
  text: string;
  isCompleted?: boolean;
};

export type List = {
  id: string;
  createdAt: number;
  name: string;
  icon?: string;
  color: string;
  type: ListTypes;
  items: Item[];
};

export enum ListTypes {
  CHECK_LIST = "CHECK_LIST",
  BULLET_LIST = "BULLET_LIST",
  TEXT_AREA = "TEXT_AREA",
}
