import { CHANGE_VIEW } from "../actionTypes";

export function onChangeView(viewType, sectionId, itemId) {
  return (dispatch) =>
    dispatch({
      type: CHANGE_VIEW,
      payload: { viewType, scrollInfo: { sectionId, itemId } },
    });
}
