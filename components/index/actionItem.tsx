import { FunctionComponent, MouseEventHandler } from "react";
import { Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Button, ButtonType } from "../Button";

type ActionItemProps = {
  readonly action: ActionViewType;
  readonly onMouseEnter: MouseEventHandler;
  readonly onMouseLeave: MouseEventHandler;
  readonly renderDots?: () => JSX.Element;
  readonly renderSlider?: () => JSX.Element
};

export const ActionItem: FunctionComponent<ActionItemProps> = ({
  action,
  onMouseEnter,
  onMouseLeave,
  renderDots,
  renderSlider,
}) => (
  <Stack
    bg="secondary"
    flex="1"
    h="min-content"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    overflowY="clip"
    padding={4}
    rounded="md"
    spacing={4}
    textAlign="center"
    w="400px"
    maxW="400px"
    alignContent="center"
  >
    <Stack spacing={4}>
      <Text textStyle="discounts">{action.title}</Text>
      <Text textStyle="discounts">{action.subtitle}</Text>
      <Text textStyle="discounts">{action.note}</Text>
      <Button type={ButtonType.Primary}>
        <NextLink href={action.moreInfoLink}>VÍCE INFORMACÍ</NextLink>
      </Button>
    </Stack>
    {renderSlider?.()}
    {renderDots?.()}
  </Stack>
);
