import { APP_MOUNT_SUCCESS } from "../actionTypes";

export function globalEntitiesReducer(state, action) {
  switch (action.type) {
    case APP_MOUNT_SUCCESS: {
      return action.payload.entities;
    }
    default:
      return state;
  }
}
