import { FunctionComponent } from "react";
import {
  Center,
  Radio,
  RadioGroup,
  Stack,
  StackDirection,
} from "@chakra-ui/react";
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
  <Center>
    <RadioGroup value={activeIndex}>
      <Stack direction={direction} overflow="hidden" spacing={spacing}>
        {new Array(totalActions).fill(null, 0, totalActions).map((_, index) => (
          <Radio
            _focus={{
              boxShadow: "none",
            }}
            _checked={{
              background: "white",
              borderColor: "white",
            }}
            key={index}
            onMouseEnter={onDotEnter(index)}
            onMouseLeave={onDotLeave}
            value={index}
          />
        ))}
      </Stack>
    </RadioGroup>
  </Center>
);
