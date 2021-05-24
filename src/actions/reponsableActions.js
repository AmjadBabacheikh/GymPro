import axios from 'axios';
import {
  ADD_ABONNEMENT_REQUEST,
  ADD_ABONNEMENT_SUCCESS,
  ADD_ABONNEMENT_FAIL,
} from '../constants/userConstants';
import {
  ADD_COUPON_REQUEST,
  ADD_COUPON_SUCCESS,
  ADD_COUPON_FAIL,
} from '../constants/responsableConstants';
export const addAbonnement =
  (prix, description, durée, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_ABONNEMENT_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${userInfo.jwt}`,
        },
      };
      await axios.post(
        '/api/responsable/abonnement',
        {
          prix,
          description,
          durée,
          image: null,
        },
        config
      );
      dispatch({ type: ADD_ABONNEMENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_ABONNEMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addCoupon = (reference, remise) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COUPON_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.jwt}`,
      },
    };
    await axios.post(
      '/api/responsable/coupons',
      {
        remise,
        reference,
      },
      config
    );
    dispatch({ type: ADD_COUPON_SUCCESS });
  } catch (error) {
    dispatch({
      type: ADD_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
