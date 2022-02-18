import { useBreakpointValue } from "@chakra-ui/react";

export const useShouldShowMobileMenu = () =>
  useBreakpointValue({ base: true, md: false });
