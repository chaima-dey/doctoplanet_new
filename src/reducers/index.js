import TokenReducer from "./TokenReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import SuccessReducer from "./SuccessReducer";
import ErrorReducer from "./ErrorReducer";
const AllReducers = combineReducers({
  TokenReducer: TokenReducer,
  UserReducer: UserReducer ,
  SuccessReducer:SuccessReducer,
  ErrorReducer:ErrorReducer
});

export default AllReducers;
