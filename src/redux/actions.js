import { CHANGE_TITLE } from "./actionTypes";

//for more info about action: https://redux.js.org/basics/actions/

export const changeTitle = content => ({
  type: CHANGE_TITLE,
  payload: {
    content
  }
});
