import type { MessageItem } from "../../redux/supportChat/type";

export interface messageDataI {
  [email: string]: {
    [time: number]: MessageItem;
  }
}

export interface messageDataUserI{
      [time: string]: MessageItem;
}