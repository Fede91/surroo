export type List = {
  id: string;
  createdAt: number;
  name: string;
  icon?: string;
  color: string;
  type: ListTypes;
  items: [];
};

export enum ListTypes {
  CHECK_LIST = "CHECK_LIST",
  BULLET_LIST = "BULLET_LIST",
  TEXT_AREA = "TEXT_AREA",
}
