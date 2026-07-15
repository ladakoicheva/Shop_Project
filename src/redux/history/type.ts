import type{ historyI } from "../../../types/types";

export interface historyStateI{
  history: historyI[]
  total:number
}
export interface historyArchiveArgsI{
  uid: string,
  purchaseID: string
}

