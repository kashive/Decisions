import { NORMALIZED_DUMMY_STATE_V2 } from "../../data/DummyState";
import { APP_MOUNT_SUCCESS } from "../actionTypes";

export function appMountSuccess(userId) {
  return dispatch => {
    dispatch({ type: APP_MOUNT_SUCCESS, payload: NORMALIZED_DUMMY_STATE_V2 });
  };
}
