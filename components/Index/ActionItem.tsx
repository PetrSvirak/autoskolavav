import React, { MouseEventHandler } from "react";
import { Center, Heading, Stack, Text } from "@chakra-ui/react";
import { RemainingSlider } from "./RemainingSlider";

type ActionItemProps = {
  readonly action: ActionViewModel;
  readonly onMouseEnter: MouseEventHandler;
  readonly onMouseLeave: MouseEventHandler;
  readonly passedTicks: number;
  readonly totalTicks: number;
};

export const ActionItem: React.FunctionComponent<ActionItemProps> = ({
  action,
  onMouseEnter,
  onMouseLeave,
  passedTicks,
  totalTicks,
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

    <RemainingSlider passedMs={passedTicks} totalMs={totalTicks} />
  </Stack>
);
