import React from "react";
import { Progress } from "@chakra-ui/react";

type RemainingSliderProps = {
  readonly passedMs: number;
  readonly totalMs: number;
};

const sliderResetAnimationLengthMs = 250;
const countSliderValue = (passedMs: number, totalMs: number) =>
  passedMs <= sliderResetAnimationLengthMs ? totalMs : totalMs - passedMs;

export const RemainingSlider: React.FunctionComponent<RemainingSliderProps> = ({
  passedMs,
  totalMs,
}) => (
  <Progress
    colorScheme="blackAlpha"
    size="xs"
    value={countSliderValue(passedMs, totalMs)}
    max={totalMs}
  />
);
