import type { RefObject } from "react";

export const scrollDown = (ref: RefObject<HTMLDivElement | null>) => {
    if(!ref.current)return
    const block = ref.current
    // const distanceToBottom = (block.scrollHeight - block.clientHeight) - block.scrollTop;
    block.scrollBy(0, block.scrollHeight );
}
  