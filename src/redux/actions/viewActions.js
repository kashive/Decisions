import { CHANGE_VIEW } from "../actionTypes";

export function onChangeView(viewType) {
  return (dispatch) => dispatch({ type: CHANGE_VIEW, payload: { viewType } });
}
