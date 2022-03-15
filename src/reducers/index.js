import TokenReducer from "./TokenReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import SuccessReducer from "./SuccessReducer";
import ReadyCall from "./ReadyCall";
import ErrorReducer from "./ErrorReducer";
const AllReducers = combineReducers({
  TokenReducer: TokenReducer,
  UserReducer: UserReducer ,
  SuccessReducer:SuccessReducer,
  ErrorReducer:ErrorReducer,
  ReadyCall:ReadyCall
});

export default AllReducers;
