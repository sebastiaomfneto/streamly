import { FC, useCallback, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Keyboard, VideoCall } from '@material-ui/icons';

type EventsPageProps = unknown & RouteComponentProps<{ eventId: string }>;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    paddingTop: theme.spacing(4),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      marginLeft: 8,
      marginRight: 8,
    },
  },
}));

const EventsPage: FC<EventsPageProps> = ({ history }) => {
  const styles = useStyles();

  const [eventId, setEventId] = useState<string | undefined>();

  const generateRandomEventId = useCallback(
    () => Math.random().toString(36).substring(7),
    []
  );

  const handleNewEvent = useCallback(() => {
    history.push(`/events/${generateRandomEventId()}`);
  }, [history, generateRandomEventId]);

  const handleEnter = useCallback(() => {
    history.push(`/events/${eventId}`);
  }, [history, eventId]);

  return (
    <>
      <AppBar color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <Container>
            <img
              src="assets/streamly.svg"
              alt="streamly"
              width="32px"
              height="32px"
            />
          </Container>
        </Toolbar>
      </AppBar>
      <Box className={styles.wrapper}>
        <Box></Box>
        <Container>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={6}>
              <Box className={styles.content}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<VideoCall />}
                  onClick={handleNewEvent}
                >
                  New Event
                </Button>

                <TextField
                  variant="outlined"
                  size="small"
                  label="Digite o código da reunião"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Keyboard />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={handleEnter}
                          disabled={!eventId}
                        >
                          Enter
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img
                src="assets/undraw_group_video_el8e.svg"
                alt="undraw_group_video"
                width="300px"
                height="300px"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EventsPage;
