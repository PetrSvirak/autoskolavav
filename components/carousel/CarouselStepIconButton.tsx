import React from 'react';
import useCarouselControls from './useCarouselControls';
import CarouselIconButton, {
  CarouselIconButtonProps,
} from './CarouselIconButton';

export interface CarouselStepIconButtonProps extends CarouselIconButtonProps {
  delta: number;
}

export default function CarouselStepIconButton({
  delta,
  ...restProps
}: CarouselStepIconButtonProps) {
  const { setShownIndex, totalCount } = useCarouselControls();

  return (
    <CarouselIconButton
      // TODO: Add support for unidirectional behavior (disable at each end)
      onClick={() => {
        setShownIndex(
          prevIndex => (prevIndex + delta + totalCount) % totalCount,
        );
      }}
      {...restProps}
    />
  );
}
