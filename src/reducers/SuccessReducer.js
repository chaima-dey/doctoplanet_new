const SuccessReducer = (state = "", action) => {
  switch (action.type) {
    case "SetSuccess":
      return action.payload;
      
    default:
      return state;
  }
};

export default SuccessReducer;
