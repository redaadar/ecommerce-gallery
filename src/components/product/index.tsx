import { FC, useContext } from "react";

import { ButtonGroup, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";

import {
  Box,
  BoxProps,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ProductDetail } from "../productDetail";
import { ProductItem } from "./product";
import { FaEye } from "react-icons/fa";
import { CheckoutContext } from "../../App";

type ProductProps = BoxProps & {
  product: ProductItem;
};

export const Product: FC<ProductProps> = ({ product }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addCart } = useContext(CheckoutContext);

  return (
    <>
      <Card cursor="pointer">
        <CardBody>
          <Box overflow="hidden" h={200} display="flex" justifyContent="center">
            <Image
              src={product.image}
              alt={product.title}
              borderRadius="lg"
              resize="block"
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Tooltip label={product.title} bg='blue.600'>
              <Heading size="sm" noOfLines={1}>
                {product.title}
              </Heading>
            </Tooltip>
            <Text color="blue.600" fontSize="2xl">
              $ {product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="flex-end">
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={() => addCart(product)}>
                Ajouter au panier
            </Button>
            
          <IconButton icon={<FaEye />} onClick={onOpen} aria-label="afficher le détail" colorScheme="green" />
          </ButtonGroup>
        </CardFooter>
      </Card>
      <ProductDetail isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
};
