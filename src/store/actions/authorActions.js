import * as types from './actionTypes';
import * as courseApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    payload: {
      authors,
    },
  };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
