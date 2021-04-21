import {
  COURS_LIST_REQUEST,
  COURS_LIST_FAIL,
  COURS_LIST_SUCCESS,
} from '../constants/coursConstants';

export const coursListReducer = (state = { cours: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case COURS_LIST_REQUEST:
      return { Loading: true };
    case COURS_LIST_SUCCESS:
      return { Loading: false, cours: payload };
    case COURS_LIST_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};
