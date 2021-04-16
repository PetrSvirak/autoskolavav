import React from "react";
import { ContentHead } from "../components/contentHead";
import { Center, Container, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Action } from "../models/action";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { GetServerSideProps } from "next";
import { ActionDots } from "../components/Index/ActionDots";
import { ActionItem } from "../components/Index/ActionItem";
import { useRotate } from "../components/Index/useRotate";
import { convertBackgroundColor } from "../components/Index/utils";

type IndexProps = {
  readonly actions: ActionViewModel[];
};

const flipIntervalMs = 5000;
const tickIntervalMs = 100;

const Index: React.FunctionComponent<IndexProps> = ({ actions }) => {
  const areDotsBelow = useBreakpointValue({ base: false, md: true });
  const { activeIndex, passedMs, pauseRotationAt, resumeRotation } = useRotate(
    actions.length,
    flipIntervalMs,
    tickIntervalMs
  );

  if (!actions.length) {
    return null;
  }

  const dots = (
    <ActionDots
      activeIndex={activeIndex}
      direction={{ base: "column", md: "row" }}
      onDotEnter={pauseRotationAt}
      onDotLeave={resumeRotation}
      spacing={{ base: 2, md: 8 }}
      totalActions={actions.length}
    />
  );

  return (
    <Container padding="4">
      <ContentHead pageName="Akční nabídka" />
      <Center>
        <Stack spacing={4} direction={{ base: "row", md: "column" }}>
          {!areDotsBelow && dots}
          <ActionItem
            action={actions[activeIndex]}
            onMouseEnter={pauseRotationAt(activeIndex)}
            onMouseLeave={resumeRotation}
            passedTicks={passedMs}
            totalTicks={flipIntervalMs}
          />
          {areDotsBelow && dots}
        </Stack>
      </Center>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const actionsResult = await deliveryClient
    .items<Action>()
    .type("action")
    .toPromise();
  const actions = actionsResult?.items.map<ActionViewModel>((action) => ({
    backgroundColor: convertBackgroundColor(action),
    note: action.note.value,
    subtitle: action.subtitle.value,
    title: action.title.value,
  }));

  return {
    props: {
      actions,
    },
  };
};
