import { FunctionComponent, useRef } from "react";
import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
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
      { name: "Fotogalerie", href: "/fotogalerie" },
      { name: "Kontakt", href: "/kontakt" },
      { name: "Formuláře", href: "/formulare" },
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
      <Button ref={btnRef} w="100%" onClick={onOpen}>
        Navigace
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
            <DrawerHeader>Navigace</DrawerHeader>
            <DrawerBody>{children(onClose)}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Stack>
  );
};

export const Menu = () => {
  const showMobileMenu = useShouldShowMobileMenu();

  return showMobileMenu ? (
    <Stack>
      <DrawerWrapper>
        {(onClose) => (
          <>
            {routes.map(({ groupName, items }) => (
              <Stack key={groupName}>
                <Heading as="h2" textStyle="menu">
                  {groupName}
                </Heading>
                <UnorderedList role="navigation" type={ListType.Menu}>
                  {items.map(({ href, name }) => (
                    <ListItem key={href} onClick={onClose} textStyle="link">
                      <Link href={href} text={name} type={LinkType.Menu} />
                    </ListItem>
                  ))}
                </UnorderedList>
              </Stack>
            ))}
          </>
        )}
      </DrawerWrapper>
    </Stack>
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
