import { FC } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  ModalProps,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
  Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { ProductItem } from "../product/product";

type ProductDetailProps = Omit<ModalProps, "children"> & {
  onClose: () => void;
  isOpen: boolean;
  product: ProductItem;
};

export const ProductDetail: FC<ProductDetailProps> = ({
  product,
  onClose,
  isOpen,
  ...rest
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Card direction={{ base: 'column', sm: 'column' }}
  overflow='hidden'
  variant='outline'>
            <CardBody>
              <Box overflow="hidden" height={300} minW={100} display="flex" justifyContent="center">
                <Image
                  src={product.image}
                  alt={product.title}
                  borderRadius="lg"
                  objectFit='cover'
                  minW={100}
                />
              </Box>
              <Stack mt="6" spacing="3">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {product.category}
                </Badge>
                <Text>{product.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  $ {product.price}
                </Text>
                <Box display="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((num, i) => (
                      <StarIcon
                        key={num}
                        color={
                          i < product?.rating?.rate ? "teal.500" : "gray.300"
                        }
                      />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {product?.rating?.count} Reviews
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Annuler
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
