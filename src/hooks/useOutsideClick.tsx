import { useCallback, useEffect, RefObject } from "react";

const MOUSE_UP = "mouseup";

export const useOutsideClick = <T extends HTMLElement>(
    handleClose: () => void, 
    ref: RefObject<T>
  ) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (ref?.current?.contains && !ref?.current?.contains(event.target as Node)) {
        handleClose();
      }
    },
    [handleClose, ref]
  );

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
};
