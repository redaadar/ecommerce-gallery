import { useContext } from "react";
import { Button, GridItem, HStack, useDisclosure } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";

import { Logo } from "../logo";
import { Checkout } from "../checkout";
import { CheckoutContext } from "../../App";

export const Header = () => {

  const {isOpen, onOpen, onClose} = useDisclosure();

  const { count } = useContext(CheckoutContext);

  return (
    <GridItem py={4} px={2} area={"header"} boxShadow="xs">
      <HStack justifyContent="space-between">
        <Logo w={200} h="auto" />
        <Button leftIcon={<FaCartPlus />} variant='ghost' onClick={onOpen}>Panier {count}</Button>    
      </HStack>
      <Checkout isOpen={isOpen} onClose={onClose} />
    </GridItem>
  );
};
