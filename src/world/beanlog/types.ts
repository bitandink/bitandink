export type BeanlogResident =
  | "bean"
  | "pama"
  | "hodu";

export type BeanlogEntry = {
  resident: BeanlogResident;
  date: string;
  mood: string;
  content: string;
};