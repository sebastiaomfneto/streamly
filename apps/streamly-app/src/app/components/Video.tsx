import { forwardRef } from 'react';
import { makeStyles, Paper } from '@material-ui/core';

type VideoProps = unknown;

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
});

export const Video = forwardRef<HTMLVideoElement, VideoProps>((_props, ref) => {
  const styles = useStyles();

  return (
    <Paper className={styles.paper} elevation={4}>
      <video className={styles.video} ref={ref} autoPlay playsInline muted />
    </Paper>
  );
});
