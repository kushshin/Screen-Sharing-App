"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/Components/Button";
import useScreenShare  from "@/Hooks/useScreenShare";

function ScreenTest() {
  const {
    status,
    metadata,
    stream,
    setStatus,
    startScreenShare,
  } = useScreenShare();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
  if (status === "idle") {
    setStatus("idle");
  }
}, []);

  return (
    <div className="bg-blue-200 md:bg-[url(https://www.brosix.com/wp-content/uploads/2024/10/screen-sharing-definition.jpg)]  bg-cover bg-center h-screen flex items-center justify-center text-white px-4">

    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4 text-center">
      <h2 className="hidden text-2xl font-semibold text-blue-400">Screen Test</h2>

      {status === "idle" && (
        <Button onClick={startScreenShare}>
          Start Screen Sharing
        </Button>
      )}

      {status === "requesting" && (
        <p className="text-yellow-600 animate-pulse">
          Requesting permission...
        </p>
      )}

      {status === "denied" && (
        <p className="text-red-600">
          Permission denied...
        </p>
      )}

      {status === "cancelled" && (
        <p className="text-orange-600">
          User cancelled screen picker.
        </p>
      )}

      {status === "unsupported" && (
        <p className="text-red-600">
          Screen sharing not supported in this browser.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600">
          Unknown error occurred.
        </p>
      )}

      {status === "granted" && (
        <>
          <p className="text-green-600 font-medium mt-10">
            Screen stream active
          </p>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="border rounded-lg max-w-full"
          />

          {metadata && (
            <div className="text-sm mt-2">
              <p>
                Resolution: {metadata.width} × {metadata.height}
              </p>
              <p>
                Display Type: {metadata.displaySurface}
              </p>
            </div>
          )}
        </>
      )}

      {status === "stopped" && (
        <>
          <p className="text-gray-700 font-medium">
            Screen sharing stopped.
          </p>
          <div className="flex gap-4">
            <Button onClick={startScreenShare}>
              Retry Screen Test
            </Button>
            <Button onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </>
      )}
    </main>
    </div>
  );
}

export default ScreenTest