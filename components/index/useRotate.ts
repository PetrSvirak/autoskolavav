import { useInterval } from "@chakra-ui/react";
import { SetStateAction, useCallback, useState } from "react";

export const useRotate = (
  totalItems: number,
  flipIntervalMs: number,
  tickIntervalMs: number
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [passedMs, setPassedMs] = useState(0);

  const changeActiveIndex = useCallback((action: SetStateAction<number>) => {
    setPassedMs(0);
    setActiveIndex(action);
  }, []);

  const pauseRotationAt = useCallback(
    (index: number) => () => {
      changeActiveIndex(index);
      setIsHovered(true);
    },
    [changeActiveIndex]
  );
  const resumeRotation = useCallback(() => setIsHovered(false), []);

  useInterval(() => {
    if (totalItems <= 1 || isHovered) {
      setPassedMs(0);
      return;
    }

    if (passedMs >= flipIntervalMs) {
      changeActiveIndex((index) => (index + 1) % totalItems);
      return;
    }

    setPassedMs((ticks) => ticks + tickIntervalMs);
  }, tickIntervalMs);

  return {
    activeIndex,
    passedMs,
    pauseRotationAt,
    resumeRotation,
  };
};
