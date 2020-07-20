import { GET_ERRORS } from "./types";

export const setError = errorData => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: errorData
  });
};
