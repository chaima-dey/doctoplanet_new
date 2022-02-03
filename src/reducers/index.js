import TokenReducer from "./TokenReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "redux";
import SuccessReducer from "./SuccessReducer";
const AllReducers = combineReducers({
  TokenReducer: TokenReducer,
  UserReducer: UserReducer ,
  SuccessReducer:SuccessReducer
});

export default AllReducers;
