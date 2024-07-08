import { useQuery } from "react-query";
import Axios from "axios";
import { ProductItem } from "../product/product";

export const useProducts = (config?: any) => {
  return useQuery<Array<ProductItem>>({
    queryKey: "products",
    queryFn: () =>
      Axios.get("https://fakestoreapi.com/products").then((res) => res.data),
    refetchOnWindowFocus: false,
    ...config,
  });
};