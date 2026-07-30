export interface MessageItem {
  id: string;
  message: string;
  is: boolean;
}

export interface messageDataI {
  [email: string]: {
    [time: number]: MessageItem;
  }
}