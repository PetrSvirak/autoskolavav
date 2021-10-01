import React from "react";
import { Progress } from "@chakra-ui/react";

type RemainingSliderProps = {
  readonly passedMs: number;
  readonly totalMs: number;
};

const sliderResetAnimationLengthMs = 250;
const countSliderValue = (passedMs: number) =>
  passedMs <= sliderResetAnimationLengthMs ? 0 : passedMs;

export const RemainingSlider: React.FunctionComponent<RemainingSliderProps> = ({
  passedMs,
  totalMs,
}) => (
  <Progress
    colorScheme="whiteAlpha"
    background="transparent"
    size="xs"
    value={countSliderValue(passedMs)}
    max={totalMs}
  />
);
