import { ContentHead } from "../components/contentHead";
import { Center, Container, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Action } from "../models/action";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { InferGetServerSidePropsType, NextPage } from "next";
import { ActionDots } from "../components/index/actionDots";
import { ActionItem } from "../components/index/actionItem";
import { useRotate } from "../components/index/useRotate";
import { convertBackgroundColor } from "../components/index/utils";
import { RemainingSlider } from "../components/index/remainingSlider";
import { catchEmAllStatic } from "../components/catchEmAllStatic";
import { Custom404 } from "../components/custom404";

export const getStaticProps = catchEmAllStatic(async () => {
  const actionsResult = await deliveryClient
    .items<Action>()
    .type("action")
    .orderByDescending("system.last_modified")
    .toPromise();

  const actions = actionsResult?.items.map<ActionViewType>((action) => ({
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
});

const FlipIntervalMs = 5000;
const TickIntervalMs = 100;

const Index: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({
  actions,
}) => {
  const hasMultipleActions = actions.length > 1;
  const areDotsBelow = useBreakpointValue({ base: false, md: true });
  const { activeIndex, passedMs, pauseRotationAt, resumeRotation } = useRotate(
    actions.length,
    FlipIntervalMs,
    TickIntervalMs
  );

  if (!actions.length) {
    return <Custom404 />;
  }

  const dots = hasMultipleActions && (
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
            renderSlider={() =>
              hasMultipleActions && (
                <RemainingSlider passedMs={passedMs} totalMs={FlipIntervalMs} />
              )
            }
          />

          {areDotsBelow && dots}
        </Stack>
      </Center>
    </Container>
  );
};

export default Index;
