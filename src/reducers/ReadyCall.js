const ReadyCall = (state = false, action) => {
    switch (action.type) {
      case "SetReadyCall":
        return action.payload;
        
      default:
        return state;
    }
  };
  
  export default ReadyCall;
  