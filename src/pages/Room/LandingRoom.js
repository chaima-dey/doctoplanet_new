 
import  { useTracking } from "react-tracking";
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
      <HookButton />
    </div>
  );
};


export default LandingRoom;