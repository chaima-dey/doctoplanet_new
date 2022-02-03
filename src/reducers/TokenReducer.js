const TokenReducer = (state = localStorage.getItem("Token_docto"), action) => {
  switch (action.type) {

    case "TOKEN":
      localStorage.setItem("Token_docto", action.payload);
      return action.payload;

    case "REMOVE_TOKEN":
      localStorage.removeItem("Token_docto");
      return null;

    default:
      return state;
  }
};

export default TokenReducer;
