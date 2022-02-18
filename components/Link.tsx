import { useRouter } from "next/router";
import NextLink from "next/link";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { isValidHttpUrl } from "../utilities/isValidUri";

export enum LinkType {
  InSite = "InSite",
  Menu = "Menu",
  MobileMenu = "MobileMenu",
  OutSite = "OutSite",
}

type LinkProps = Readonly<{
  href: string;
  text: string;
  type: LinkType;
}>;

const MenuLink = ({ href, text }) => {
  const { pathname } = useRouter();

  const linkVariant = pathname === href ? "in-menu-active" : "in-menu";

  return (
    <NextLink href={href} passHref>
      <ChakraLink variant={linkVariant}>{text}</ChakraLink>
    </NextLink>
  );
};

const MobileMenuLink = ({ href, text }) => (
  <NextLink href={href} passHref>
    <Button
      as="a"
      border={0}
      fontWeight="normal"
      size="md"
      variant="ghost"
      justifyContent="start"
      w="100%"
    >
      {text}
    </Button>
  </NextLink>
);

const InSiteLink = ({ href, text }) => (
  <NextLink href={href} passHref>
    <ChakraLink>{text}</ChakraLink>
  </NextLink>
);

const OutSiteLink = ({ href, text }) => {
  if (!isValidHttpUrl(href)) {
    return <b>Invalid URI!</b>;
  }

  return (
    <ChakraLink href={href} target="_blank">
      {text}
    </ChakraLink>
  );
};

export const Link: React.FC<LinkProps> = ({ type, ...sharedProps }) => {
  switch (type) {
    case LinkType.Menu:
      return <MenuLink {...sharedProps} />;

    case LinkType.MobileMenu:
      return <MobileMenuLink {...sharedProps} />;

    case LinkType.InSite:
      return <InSiteLink {...sharedProps} />;

    case LinkType.OutSite:
      return <OutSiteLink {...sharedProps} />;

    default:
      return <b>Unknown link type!</b>;
  }
};
