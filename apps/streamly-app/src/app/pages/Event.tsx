import { FC, MutableRefObject, useCallback, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Container,
  Grid,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { useUserMedia, usePeerData } from '../hooks';
import { Video, UserMediaControls } from '../components';

type EventPageProps = unknown & RouteComponentProps<{ eventId: string }>;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    paddingTop: theme.spacing(4),
  },
}));

const EventPage: FC<EventPageProps> = ({ history, match }) => {
  const { eventId } = match.params;

  const videoRef =
    useRef<HTMLVideoElement>() as MutableRefObject<HTMLVideoElement>;

  const { mediaStream } = useUserMedia(videoRef);

  const { participants } = usePeerData(eventId, mediaStream);

  const handleClose = useCallback(() => {
    history.push('/events');
  }, [history]);

  const styles = useStyles();

  return (
    <>
      <Backdrop className={styles.backdrop} open={false}>
        <CircularProgress />
      </Backdrop>
      <Box className={styles.wrapper}>
        <Box flexGrow={1}>
          <Container>
            <Grid
              container
              alignContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6} md={4}>
                <Video ref={videoRef} />
              </Grid>
              {participants.map((participant) => (
                <Grid key={participant.id} item xs={6} md={4}>
                  <Video ref={participant.videoRef} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <UserMediaControls
          mediaStream={mediaStream}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
};

export default EventPage;
