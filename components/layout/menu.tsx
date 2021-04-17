import { FunctionComponent, useRef } from "react";
import {
  Button,
  Heading,
  Link,
  ListItem,
  Stack,
  UnorderedList,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const routes = [
  {
    groupName: "Informace",
    items: [
      { name: "Akční nabídka", href: "/" },
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

const activeStyle = {
  background: "orange.500",
  color: "white",
};
const hoverStyle = activeStyle;

const OurLink = ({ href = "", text }) => {
  const { pathname } = useRouter();
  return (
    <NextLink href={href} passHref>
      <Link
        {...(pathname === href ? activeStyle : {})}
        _hover={hoverStyle}
        display="block"
        paddingX={2}
        paddingY={1}
        rounded="md"
      >
        {text}
      </Link>
    </NextLink>
  );
};

const DrawerWrapper: FunctionComponent<{
  children: (onClose: () => void) => JSX.Element;
}> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Stack padding={4}>
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
  const shouldShowAsMenu = useBreakpointValue({ base: true, md: false });

  return shouldShowAsMenu ? (
    <Stack padding={4}>
      <DrawerWrapper>
        {(onClose) => (
          <>
            {routes.map(({ groupName, items }) => (
              <Stack key={groupName}>
                <Heading as="h4" size="md">
                  {groupName}
                </Heading>
                <UnorderedList
                  role="navigation"
                  listStyleType="none"
                  spacing={1}
                >
                  {items.map(({ href, name }) => (
                    <ListItem key={href} onClick={onClose}>
                      <OurLink href={href} text={name} />
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
    <Stack borderWidth={1} padding={4} rounded="md" spacing={4}>
      {routes.map(({ groupName, items }) => (
        <Stack key={groupName}>
          <Heading as="h4" size="md">
            {groupName}
          </Heading>
          <UnorderedList role="navigation" listStyleType="none" spacing={1}>
            {items.map(({ href, name }) => (
              <ListItem key={href}>
                <OurLink href={href} text={name} />
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      ))}
    </Stack>
  );
};
