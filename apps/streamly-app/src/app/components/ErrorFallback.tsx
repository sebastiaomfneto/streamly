import { FC } from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';

type ErrorFallbackProps = unknown;

const useStyles = makeStyles({
  gridContainer: {
    height: '100vh',
  },
});

export const ErrorFallback: FC<ErrorFallbackProps> = () => {
  const styles = useStyles();

  return (
    <Container>
      <Grid
        className={styles.gridContainer}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <img
            src="assets/undraw_fixing_bugs_w7gi.svg"
            alt="undraw_fixing_bugs"
            width="300px"
            height="300px"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">there was an unexpected error</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
