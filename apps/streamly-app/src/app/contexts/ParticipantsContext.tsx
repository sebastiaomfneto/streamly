import {
  createContext,
  createRef,
  Dispatch,
  FC,
  MutableRefObject,
  Reducer,
  useReducer,
} from 'react';

type Participant = {
  id: string;
  videoRef: MutableRefObject<HTMLVideoElement>;
};

type Action =
  | { type: 'ADD_PARTICIPANT'; payload: { id: string } }
  | {
      type: 'UPDATE_PARTICIPANT_VIDEOREF';
      payload: { id: string; stream: MediaStream };
    }
  | { type: 'REMOVE_PARTICIPANT'; payload: { id: string } };

type Context = {
  participants: Participant[];
  dispatch: Dispatch<Action>;
};

const reducer: Reducer<Participant[], Action> = (state, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return state.concat({
        id: action.payload.id,
        videoRef: createRef() as MutableRefObject<HTMLVideoElement>,
      });
    case 'UPDATE_PARTICIPANT_VIDEOREF': {
      const participant = state.find((p) => p.id === action.payload.id);
      if (participant?.videoRef.current) {
        participant.videoRef.current.srcObject = action.payload.stream;
      }
      return Array.from(state);
    }
    case 'REMOVE_PARTICIPANT':
      return state.filter((p) => p.id !== action.payload.id);
    default:
      throw new Error('Not implemented');
  }
};

const initialState: Participant[] = [];

export const ParticipantsContext = createContext<Context>({} as Context);

export const ParticipantsContextProvider: FC = ({ children }) => {
  const [participants, dispatch] = useReducer(reducer, initialState);

  return (
    <ParticipantsContext.Provider value={{ participants, dispatch }}>
      {children}
    </ParticipantsContext.Provider>
  );
};
