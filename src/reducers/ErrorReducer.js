const ErrorReducer = (state = "", action) => {
    switch (action.type) {
      case "SetError":
        return action.payload;
        
      default:
        return state;
    }
  };
  
  export default ErrorReducer;
  