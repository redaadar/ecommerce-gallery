import { Container, Grid } from "@chakra-ui/react";

import { Products } from "./components/products";
import { Header } from "./components/header";
import { createContext, useCallback, useState } from "react";
import { ProductItem } from "./components/product/product";
import { Footer } from "./components/footer";

export const CheckoutContext = createContext<{
  count: number;
  setCount: (id: number, count: number) => void;
  listCheckout: Array<ProductItem>;
  addCart: (newValue: ProductItem) => void;
  deleteCart: (id: number) => void;
}>({
  count: 0,
  setCount: () => {},
  listCheckout: [],
  addCart: () => {},
  deleteCart: () => {},
});

export const App = () => {
  const [listCheckout, setListCheckout] = useState<Array<ProductItem>>([]);

  const count = listCheckout.reduce((accumulator, item) => {
    return (accumulator += item.count);
  }, 0);

  const setCount = useCallback((id: number, count: number) => {
    setListCheckout((prevState) =>
      prevState?.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            count,
          };
        } else {
          return item;
        }
      })
    );
  }, []);

  const addCart = (val: ProductItem) => {
    let products = [];
    const checkoutCurrentIndex = listCheckout?.findIndex(
      (item) => item?.id === val?.id
    );
    if (checkoutCurrentIndex > -1) {
      products = listCheckout?.map((item) => {
        if (item?.id === val?.id) {
          return {
            ...item,
            count: item?.count + 1,
          };
        } else {
          return item;
        }
      });
    } else {
      products = [
        ...listCheckout,
        {
          ...val,
          count: 1,
        },
      ];
    }
    setListCheckout(products);
  };

  const deleteCart = (id: number) => {
    setListCheckout((prevState) =>
      prevState?.filter((item) => item?.id !== id)
    );
  };

  return (
    <Container maxW="6xl">
      <Grid
        templateAreas={`"header header" "main main" "footer footer"`}
        gridTemplateColumns={"200px 1fr"}
        gap={5}
        mb={5}
      >
        <CheckoutContext.Provider
          value={{
            count,
            setCount,
            listCheckout,
            addCart,
            deleteCart,
          }}
        >
          <Header />
          <Products />
        </CheckoutContext.Provider>
        <Footer />
      </Grid>
    </Container>
  );
};
