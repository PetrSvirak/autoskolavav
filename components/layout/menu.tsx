import { FunctionComponent, useRef } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  ListItem,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, LinkType } from "../Link";
import { ListType, UnorderedList } from "../List";
import { useShouldShowMobileMenu } from "../../hooks/useShouldShowMobileMenu";

const routes = [
  {
    groupName: "Informace",
    items: [
      { name: "Kontakt", href: "/kontakt" },
      { name: "Formuláře", href: "/formulare" },
      { name: "Fotogalerie", href: "/fotogalerie" }
    ],
  },
  {
    groupName: "Klasické",
    items: [
      { name: "Kurzy", href: "/klasicke/kurzy" },
      { name: "Rychlokurzy", href: "/klasicke/rychlokurzy" },
      { name: "Ceník", href: "/klasicke/cenik" },
      { name: "Termíny", href: "/klasicke/terminy" },
    ],
  },
  {
    groupName: "Profesní školení",
    items: [
      { name: "Popis", href: "/profesni/popis" },
      { name: "Kurzy", href: "/profesni/kurzy" },
      { name: "Ceník", href: "/profesni/cenik" },
      { name: "Termíny", href: "/profesni/terminy" },
    ],
  },
];

const DrawerWrapper: FunctionComponent<{
  children: (onClose: () => void) => JSX.Element;
}> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Stack>
      <Button ref={btnRef} w="100%" onClick={onOpen} style={{ fontSize: 24 }}>
        ☰
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody py={8}>{children(onClose)}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Stack>
  );
};

export const Menu = () => {
  const showMobileMenu = useShouldShowMobileMenu();

  return showMobileMenu ? (
    <DrawerWrapper>
      {(onClose) => (
        <Stack spacing={6}>
          {routes.map(({ groupName, items }) => (
            <Box key={groupName}>
              <Container as="h2" mb={2} textStyle="menu">
                {groupName}
              </Container>
              <UnorderedList role="navigation" type={ListType.MobileMenu}>
                {items.map(({ href, name }) => (
                  <ListItem
                    key={href}
                    onClick={onClose}
                    textStyle="link"
                  >
                    <Link href={href} text={name} type={LinkType.MobileMenu} />
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          ))}
        </Stack>
      )}
    </DrawerWrapper>
  ) : (
    <Stack spacing="70px" direction="row">
      {routes.map(({ groupName, items }) => (
        <Stack key={groupName} spacing={0}>
          <Container as="h2" textStyle="menu" padding="0">
            {groupName}
          </Container>
          <UnorderedList type={ListType.Menu} role="navigation">
            {items.map(({ href, name }) => (
              <ListItem key={href}>
                <Link href={href} text={name} type={LinkType.Menu} />
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      ))}
    </Stack>
  );
};
