export interface messageDataI{
[date: string]:MessageItem[]
}
export interface MessageItem {
  id: string;
  time: string;
  message: string;
}