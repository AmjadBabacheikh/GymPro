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
  COUPONS_LIST_REQUEST,
  COUPONS_LIST_SUCCESS,
  COUPONS_LIST_FAIL,
  LIST_COACHS_RESPO_REQUEST,
  LIST_COACHS_RESPO_SUCCESS,
  LIST_COACHS_RESPO_FAIL,
  ADD_SEANCE_REQUEST,
  ADD_SEANCE_SUCCESS,
  ADD_SEANCE_FAIL,
} from '../constants/responsableConstants';
export const addAbonnement =
  (prix, description, durée, img) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_ABONNEMENT_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          // 'Content-type': 'multipart/form-data, boundary=--abc--abc--',
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
          imgPath: img,
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

export const getCoupons = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPONS_LIST_REQUEST,
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
    const { data } = await axios.get(
      `/api/responsable/coupons?pageNo=${pageNo}&pageSize=${1}&sortBy=id`,
      config
    );
    dispatch({ type: COUPONS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COUPONS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCoachsRespo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_COACHS_RESPO_REQUEST,
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
    const { data } = await axios.get(`/api/responsable/coachs`, config);
    dispatch({ type: LIST_COACHS_RESPO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_COACHS_RESPO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addSeance =
  (heureDebut, heureFin, idCours, idJour, idCoach) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_SEANCE_REQUEST,
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
        '/api/responsable/seances',
        {
          heureDebut,
          heureFin,
          cours: { id: idCours },
          jour: { id: idJour },
          coach: { id: idCoach },
        },
        config
      );
      dispatch({ type: ADD_SEANCE_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_SEANCE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
