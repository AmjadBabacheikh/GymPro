import axios from 'axios';
import {
  COURS_LIST_REQUEST,
  COURS_LIST_FAIL,
  COURS_LIST_SUCCESS,
} from '../constants/coursConstants';

export const getListCours = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURS_LIST_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/cours`, config);
    dispatch({ type: COURS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
