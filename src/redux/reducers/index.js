import { combineReducers } from "redux";
import { decisionsReducer } from "./decisionsReducer";
import { controlStateReducer } from "./controlStateReducer";

export default combineReducers({
  entities: combineReducers({
    decisions: decisionsReducer
  }),
  controlState: combineReducers({ activeDecision: controlStateReducer })
});
