import { FC } from "react";
import { Center, GridItem, GridItemProps, Text } from "@chakra-ui/react";

type FooterProps = GridItemProps;

export const Footer: FC<FooterProps> = ({ ...rest }) => {
  return (
    <GridItem py={2} area={"footer"} boxShadow="xs" {...rest}>
      <Center>
        <Text fontSize="xs">
          &copy; 2024 by individual https://www.carrefour.fr/
        </Text>
      </Center>
    </GridItem>
  );
};
