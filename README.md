# 📺 Screen Sharing Test App

A simple Screen Sharing Test application built using **Next.js (App
Router)**, **TypeScript**, and **Tailwind CSS**.

This app allows users to start and stop screen sharing using the
browser's native `navigator.mediaDevices.getDisplayMedia` API and
handles all permission states properly.

------------------------------------------------------------------------

# 🚀 Setup Instructions

## 1️⃣ Clone the Repository

``` bash
git clone <your-repository-url>
cd <screen_share-app>
```

## 2️⃣ Install Dependencies

``` bash
npm install
```

## 3️⃣ Run the Development Server

``` bash
npm run dev
```

Open your browser and visit:

    http://localhost:3000

------------------------------------------------------------------------

# 🧠 Screen Sharing Flow Explanation

Below is the complete working flow of the screen-sharing functionality.

------------------------------------------------------------------------

## 1️⃣ Initial State

When the user navigates to `/screentest`, the initial status is:

    "idle"

The UI displays:

-   Start Screen Share button

------------------------------------------------------------------------

## 2️⃣ User Clicks "Start Screen Share"

The `startScreenShare()` function executes.

### Internally:

1.  The app checks if the browser supports screen sharing:

        navigator.mediaDevices.getDisplayMedia

2.  If supported:

    -   Status changes to `"requesting"`
    -   Browser opens a permission popup

------------------------------------------------------------------------

## 3️⃣ Browser Permission Popup

User selects:

-   Entire screen
-   Window
-   Browser tab
-   Or cancels

------------------------------------------------------------------------

### ✅ If User Grants Permission

1.  Browser returns a `MediaStream` object.

2.  The stream is stored in a React `useRef`.

3.  The first video track is extracted:

        stream.getVideoTracks()[0]

4.  Metadata is extracted using:

        track.getSettings()

5.  Metadata such as:

    -   width
    -   height
    -   displaySurface is saved in state.

6.  Status changes to:

        "granted"

UI now shows:

-   Stop Screen Share button
-   Screen metadata details

------------------------------------------------------------------------

### ❌ If User Denies Permission

-   Error: `NotAllowedError`
-   Status becomes `"denied"`
-   UI shows Retry button

------------------------------------------------------------------------

### 🚫 If User Cancels

-   Error: `AbortError`
-   Status becomes `"cancelled"`

------------------------------------------------------------------------

### 🌐 If Browser Unsupported

-   Status becomes `"unsupported"`

------------------------------------------------------------------------

## 4️⃣ Stopping Screen Share

Screen sharing can stop in two ways:

### A) User clicks Stop button

1.  All tracks are stopped:

        stream.getTracks().forEach(track => track.stop())

2.  Stream reference is cleared.

3.  Metadata is cleared.

4.  Status becomes `"stopped"` (or reset to `"idle"` depending on UI
    logic).

------------------------------------------------------------------------

### B) User clicks "Stop Sharing" in browser popup

The browser triggers:

    track.onended

This automatically calls the stop function to clean up.

------------------------------------------------------------------------

## 5️⃣ Cleanup on Component Unmount

When the user navigates away from the page:

    useEffect(() => {
      return () => stopScreenShare();
    }, [stopScreenShare]);

This ensures:

-   No active stream remains
-   No memory leaks occur

------------------------------------------------------------------------

# 📊 Status States Used

  Status        Meaning
  ------------- ------------------------------
  idle          Initial state
  requesting    Waiting for permission
  granted       Screen is being shared
  denied        Permission denied
  cancelled     Permission dialog closed
  unsupported   Browser does not support API
  stopped       Sharing stopped
  error         Unexpected error

------------------------------------------------------------------------

# 🔒 Important Notes

-   Screen sharing works only in secure environments (HTTPS or
    localhost).
-   Supported in modern browsers (Chrome, Edge, Firefox).
-   MediaStream is stored using `useRef` to avoid unnecessary
    re-renders.
-   `useCallback` is used to stabilize the stop function inside
    `useEffect` cleanup.

------------------------------------------------------------------------

# 📌 Summary

This application demonstrates:

-   Usage of the MediaDevices API
-   Managing MediaStream lifecycle
-   Handling permission states
-   React custom hook architecture
-   Proper cleanup handling

------------------------------------------------------------------------
