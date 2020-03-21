import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewares = [thunk];

export default createStore(
  rootReducer,
  {
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
