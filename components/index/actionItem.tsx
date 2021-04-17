import { FunctionComponent, MouseEventHandler } from "react";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";

type ActionItemProps = {
  readonly action: ActionViewType;
  readonly onMouseEnter: MouseEventHandler;
  readonly onMouseLeave: MouseEventHandler;
  readonly renderSlider?: () => JSX.Element;
};

export const ActionItem: FunctionComponent<ActionItemProps> = ({
  action,
  onMouseEnter,
  onMouseLeave,
  renderSlider,
}) => (
  <Stack
    bg={action.backgroundColor}
    borderWidth={1}
    flex="1"
    h="300px"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    overflowY="clip"
    padding={4}
    rounded="md"
    spacing={4}
    textAlign="center"
    w="400px"
  >
    <Heading as="h2" size="lg">
      {action.title}
    </Heading>

    <Center h="100%" w="100%">
      <Stack spacing={4}>
        <Heading as="h3" size="md">
          {action.subtitle}
        </Heading>
        <Text>{action.note}</Text>
      </Stack>
    </Center>

    {renderSlider?.()}
  </Stack>
);
