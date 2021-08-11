import { MutableRefObject, useEffect, useState } from 'react';

export const useUserMedia = (videoRef?: MutableRefObject<HTMLVideoElement>) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(setMediaStream)
      .catch(setError);
  }, []);

  useEffect(() => {
    return () => {
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  }, [mediaStream]);

  useEffect(() => {
    if (videoRef?.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [videoRef, mediaStream]);

  return {
    mediaStream,
    error,
  };
};
