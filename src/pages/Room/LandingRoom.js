 
import track, { useTracking } from "react-tracking";
import React from "react";

const HookButton = () => {
  const { trackEvent } = useTracking();
  return (
    <div>
      <h2>Click for HookButton</h2>
      <button
        onClick={() =>
          trackEvent({
            funComponent: "HookButton",
            event: "HookButton-Clicked",
            userID : "userID"
          })
        }
      >
        Click Me!
      </button>
    </div>
  );
};

const LandingRoom = () => {
  return (
    <div className="App">
      <h1>React-Tracking</h1>
      <HookButton />
 
    </div>
  );
};
const  TrackedApp = track(
  // app-level tracking data
  { app: "tracking-app" },

  // top-level options
  {
    // custom dispatch to console.log in addition to pushing to dataLayer[]
    dispatch: (data) => {
      console.log(data);
    }
  }
)(LandingRoom);

export default TrackedApp;