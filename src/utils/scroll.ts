import type { RefObject } from 'react';

export const scrollDown = (ref: RefObject<HTMLElement | null>) => {
  if (!ref || !ref.current) return;
  const block = ref.current;

  // Immediate scroll
  block.scrollTop = block.scrollHeight;

  // Delayed scroll after DOM paint & image load
  setTimeout(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, 60);
};