import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStack, setIsOpenStack] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleStack = () => {
    setIsOpenStack(!isOpenStack);
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    isOpenStack,
    setIsOpenStack,
    toggleStack
  };
}

export default useModal
