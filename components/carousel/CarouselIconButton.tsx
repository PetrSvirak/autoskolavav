import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselIconButtonProps extends IconButtonProps {}

export default function CarouselIconButton(props: CarouselIconButtonProps) {
  return (
    <IconButton
      variantColor="blackAlpha"
      color="white"
      size="lg"
      fontSize="3xl"
      isRound
      css={css`
        touch-action: manipulation;
      `}
      {...props}
    />
  );
}
