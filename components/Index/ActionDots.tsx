import React, { FunctionComponent, MouseEventHandler } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { StackDirection } from "@chakra-ui/layout/dist/types/stack.utils";
import { SystemProps } from "@chakra-ui/system";

type ActiveDotsProp = {
  readonly activeIndex: number;
  readonly direction: StackDirection;
  readonly onDotEnter: (actionIndex: number) => () => void;
  readonly onDotLeave: () => void;
  readonly spacing: SystemProps["margin"];
  readonly totalActions: number;
};

export const ActionDots: FunctionComponent<ActiveDotsProp> = ({
  activeIndex,
  direction,
  onDotEnter,
  onDotLeave,
  spacing,
  totalActions,
}) => (
  <RadioGroup value={activeIndex}>
    <Stack direction={direction} overflow="hidden" spacing={spacing}>
      {new Array(totalActions).fill(null, 0, totalActions).map((_, index) => (
        <Radio
          _focus={{
            boxShadow: "none",
          }}
          key={index}
          onMouseEnter={onDotEnter(index)}
          onMouseLeave={onDotLeave}
          value={index}
        />
      ))}
    </Stack>
  </RadioGroup>
);
