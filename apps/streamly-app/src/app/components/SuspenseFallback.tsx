import { Box } from '@material-ui/core';
import { FC } from 'react';

export const SuspenseFallback: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <img
        src="assets/streamly.svg"
        alt="streamly"
        width="300px"
        height="300px"
      />
    </Box>
  );
};
