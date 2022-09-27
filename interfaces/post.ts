import type Author from "./author";

type Issue = {
  title: string;
  date: string;
  description: string;
  state: string;
  labels: (
    | string
    | {
        name?: string;
        color?: string;
      }
  )[];
};

export default Issue;
