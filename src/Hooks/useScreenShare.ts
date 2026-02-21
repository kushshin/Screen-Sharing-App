"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export type ScreenStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "cancelled"
  | "unsupported"
  | "stopped"
  | "error";

interface Metadata {
  width?: number;
  height?: number;
  displaySurface?: string;
}

 const useScreenShare = () => {
  const [status, setStatus] = useState<ScreenStatus>("idle");
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const mediasStreamRef = useRef<MediaStream | null>(null);

  const isSupported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getDisplayMedia;

  const stopScreenShare = useCallback(() => {
    if (mediasStreamRef.current) {
      mediasStreamRef.current.getTracks().map((track) => track.stop());
      mediasStreamRef.current = null;
    }
    setMetadata(null);
    setStatus("stopped");
  }, []);


  const startScreenShare = async () => {
    if (!isSupported) {
      setStatus("unsupported");
      return;
    }

    setStatus("requesting");

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });
    //   console.log(stream)

      mediasStreamRef.current = stream;
    //   console.log(stream)

      const trackData = stream.getVideoTracks()[0];
    //   console.log(trackData)
      const trackSettings = trackData.getSettings();
    //   console.log(settings)

      setMetadata({
        width: trackSettings.width,
        height: trackSettings.height,
        displaySurface: trackSettings.displaySurface,
      });

      trackData.onended = () => {
        stopScreenShare();
      };

      setStatus("granted");
    } catch (error: any) {
      if (error.name === "NotAllowedError") {
        setStatus("denied");
      } else if (error.name === "AbortError") {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    }
  };

  

  useEffect(() => {
    return () => {
      stopScreenShare();
    };
  }, [stopScreenShare]);

  return {
    status,
    metadata,
    stream: mediasStreamRef.current,
    startScreenShare,
    stopScreenShare,
    setStatus,
    isSupported,
  };
};

export default useScreenShare