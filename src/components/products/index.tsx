import {
  Center,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Product } from "../product";
import { ProductItem } from "../product/product";
import { useProducts } from "./products.service";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState<Array<ProductItem>>([]);

  const toast = useToast();

  const {
    isLoading,
    isError,
    data: dataProducts,
  } = useProducts({
    onSuccess(data: Array<ProductItem>) {
      setProducts(data);
    },
    onError() {
      toast({
        title: `Erreur lors de chargement la liste des produits`,
        status: "error",
        isClosable: true,
      });
    },
  });

  if (isLoading) {
    return (
      <GridItem area={"main"} textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </GridItem>
    );
  }

  if (isError) {
    return (
      <Stack layerStyle="layoutBox" p={4} bg="gray" flex={1}>
        <Center>
          <Text>Erreur lors de chargement des produits</Text>
        </Center>
      </Stack>
    );
  }

  const handleSort = (order: "asc" | "desc") => {
    const data = dataProducts
      ?.sort((a, b) => {
        if (order === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
      .map((item) => item);

    setProducts(data as Array<ProductItem>);
  };

  const handleInputChange = (value: string) => {
    const data = dataProducts?.filter((product: ProductItem) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(data as Array<ProductItem>);
  };

  return (
    <GridItem area={"main"}>
      <Stack
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Heading as="h1" size="lg" mb={4}>
          Produits
        </Heading>
        <Stack flexDir={{ base: "column", md: "row" }}>
          <InputGroup>
            <Input
              placeholder="Rechercher un produit"
              onChange={(event) => handleInputChange(event.target.value)}
            />
            <InputRightElement>
              <SearchIcon color="blue.500" />
            </InputRightElement>
          </InputGroup>

          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Tri"
            >
              Tri
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup title="Type" type="radio" defaultValue="price">
                <MenuItemOption value="price">Prix</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                defaultValue="asc"
                title="Tri"
                type="radio"
                onChange={(value: any) => handleSort(value)}
              >
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
      >
        {products?.map((product: ProductItem) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
    </GridItem>
  );
};
