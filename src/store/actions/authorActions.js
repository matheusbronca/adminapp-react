import * as types from './actionTypes';
import * as courseApi from '../../api/authorApi';

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
    return courseApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
