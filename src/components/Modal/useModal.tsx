import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStack, setIsOpenStack] = useState(false);
  const [isOpenOderDone, setIsOpenOrderDone] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleStack = () => {
    setIsOpenStack(!isOpenStack);
  };

  const toggleOrderDone= () => {
    setIsOpenOrderDone(!isOpenOderDone);
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    isOpenStack,
    setIsOpenStack,
    toggleStack,
    isOpenOderDone,
    setIsOpenOrderDone,
    toggleOrderDone
  };
}

export default useModal
