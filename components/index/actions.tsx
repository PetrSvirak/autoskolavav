import { Center } from "@chakra-ui/react";
import { useRotate } from "./useRotate";
import { Custom404 } from "../custom404";
import { ActionDots } from "./actionDots";
import { ActionItem } from "./actionItem";
import { FunctionComponent } from "react";
import { RemainingSlider } from "./remainingSlider";

const FlipIntervalMs = 5000;
const TickIntervalMs = 100;

type ActionsProps = {
  readonly actions: readonly ActionViewType[];
};

export const Actions: FunctionComponent<ActionsProps> = ({ actions }) => {
  const hasMultipleActions = actions.length > 1;
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
      direction={{ base: "row", md: "row" }}
      onDotEnter={pauseRotationAt}
      onDotLeave={resumeRotation}
      spacing={{ base: 3, md: 3 }}
      totalActions={actions.length}
    />
  );

  const slider = hasMultipleActions && (
    <RemainingSlider passedMs={passedMs} totalMs={FlipIntervalMs} />
  );

  return (
    <Center height="320px" alignItems="baseline">
      <ActionItem
        action={actions[activeIndex]}
        onMouseEnter={pauseRotationAt(activeIndex)}
        onMouseLeave={resumeRotation}
        renderDots={() => dots}
        renderSlider={() => slider}
      />
    </Center>
  );
};
