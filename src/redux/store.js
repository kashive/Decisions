import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import ls from "local-storage";

const middlewares = [thunk];

export default createStore(
  rootReducer,
  ls.get("state") || {
    entities: {
      decisions: {
        byId: {},
        allIds: []
      },
      variables: {
        byId: {},
        allIds: []
      },
      options: {
        byId: {},
        allIds: []
      }
    },
    controlState: {
      decisionId: undefined
    }
  },
  applyMiddleware(...middlewares)
);
