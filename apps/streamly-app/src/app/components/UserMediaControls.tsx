import { FC, useEffect, useState } from 'react';
import {
  makeStyles,
  Box,
  Paper,
  IconButton,
  Container,
  Grid,
} from '@material-ui/core';
import { Close, Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';

type UserMediaControlsProps = {
  mediaStream?: MediaStream;
  handleClose?: () => void;
};

const useStyles = makeStyles({
  wrapper: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  paper: {
    display: 'flex',
    height: 80,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export const UserMediaControls: FC<UserMediaControlsProps> = ({
  mediaStream,
  handleClose,
}) => {
  const [hasAudio, setHasAudio] = useState<boolean>(
    () =>
      mediaStream
        ?.getAudioTracks()
        .reduce<boolean>(
          (aggregator, track) => aggregator && track.enabled,
          true
        ) ?? true
  );

  const [hasVideo, setHasVideo] = useState<boolean>(
    () =>
      mediaStream
        ?.getVideoTracks()
        .reduce<boolean>(
          (aggregator, track) => aggregator && track.enabled,
          true
        ) ?? true
  );

  useEffect(() => {
    mediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = hasAudio;
    });
  }, [mediaStream, hasAudio]);

  useEffect(() => {
    mediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = hasVideo;
    });
  }, [mediaStream, hasVideo]);

  const styles = useStyles();

  return (
    <Box className={styles.wrapper}>
      <Container>
        <Paper className={styles.paper} variant="outlined">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <IconButton onClick={() => setHasAudio((v) => !v)}>
                {hasAudio ? <Mic /> : <MicOff color="secondary" />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose} color="secondary">
                <Close />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setHasVideo((v) => !v)}>
                {hasVideo ? <Videocam /> : <VideocamOff color="secondary" />}
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};
