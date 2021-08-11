import { FC } from 'react';
import { makeStyles, Container, Grid, Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';

type Error404PageProps = unknown & RouteComponentProps;

const useStyles = makeStyles({
  gridContainer: {
    height: '100vh',
  },
});

const Error404Page: FC<Error404PageProps> = () => {
  const styles = useStyles();

  return (
    <Container>
      <Grid
        className={styles.gridContainer}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <img
            src="assets/undraw_page_not_found_su7k.svg"
            alt="undraw_page_not_found"
            width="300px"
            height="300px"
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h3">page not found</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Error404Page;
