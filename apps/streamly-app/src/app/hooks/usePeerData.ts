import { useContext, useEffect, useRef } from 'react';
import PeerData, { SocketChannel, Participant } from 'peer-data';

import { environment } from '../../environments/environment';
import { ParticipantsContext } from '../contexts';

new SocketChannel(environment.apiSignalingUrl);

const servers: RTCConfiguration = {
  iceServers: environment.iceServers,
};

export const usePeerData = (
  eventId: string | undefined,
  mediaStream: MediaStream | undefined
) => {
  const peerData = useRef(new PeerData(servers));

  const { participants, dispatch } = useContext(ParticipantsContext);

  useEffect(() => {
    if (!(eventId && mediaStream)) {
      return;
    }

    const room = peerData.current
      .connect(eventId, mediaStream)
      .on('participant', (participant: Participant) => {
        const id = participant.getId();

        dispatch({
          type: 'ADD_PARTICIPANT',
          payload: { id },
        });

        participant
          .on('track', ({ streams: [stream] }: RTCTrackEvent) => {
            dispatch({
              type: 'UPDATE_PARTICIPANT_VIDEOREF',
              payload: { id, stream },
            });
          })
          .on('disconnected', () => {
            dispatch({
              type: 'REMOVE_PARTICIPANT',
              payload: { id },
            });
          })
          .on('error', (event: Event) => {
            console.error(event);
            participant.renegotiate();
          });
      })
      .on('error', (event: Event) => {
        console.error(event);
      });

    return () => {
      room.disconnect();
    };
  }, [eventId, mediaStream, dispatch]);

  return { participants };
};
