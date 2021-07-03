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
  DELETE_SEANCE_REQUEST,
  DELETE_SEANCE_SUCCESS,
  DELETE_SEANCE_FAIL,
  UPDATE_SEANCE_REQUEST,
  UPDATE_SEANCE_SUCCESS,
  UPDATE_SEANCE_FAIL,
  UPDATE_SEANCE_RESET,
  GET_SEANCE_REQUEST,
  GET_SEANCE_SUCCESS,
  GET_SEANCE_FAIL,
  GET_SEANCE_RESET,
} from '../constants/responsableConstants';

export const abonnementAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ABONNEMENT_REQUEST:
      return { Loading: true };
    case ADD_ABONNEMENT_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_ABONNEMENT_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const couponAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_COUPON_REQUEST:
      return { Loading: true };
    case ADD_COUPON_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_COUPON_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const couponsListReducer = (state = { coupons: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case COUPONS_LIST_REQUEST:
      return { Loading: true };
    case COUPONS_LIST_SUCCESS:
      return {
        Loading: false,
        coupons: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case COUPONS_LIST_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const coachsListRespoReducer = (state = { coachs: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_COACHS_RESPO_REQUEST:
      return { Loading: true };
    case LIST_COACHS_RESPO_SUCCESS:
      return {
        Loading: false,
        coachs: payload.content,
      };
    case LIST_COACHS_RESPO_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const seanceAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_SEANCE_REQUEST:
      return { Loading: true };
    case ADD_SEANCE_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_SEANCE_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const removeSeanceReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_SEANCE_REQUEST:
      return { Loading: true };
    case DELETE_SEANCE_SUCCESS:
      return { Loading: false, successDelete: true };
    case DELETE_SEANCE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};

export const seanceUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEANCE_REQUEST:
      return { Loading: true };
    case UPDATE_SEANCE_SUCCESS:
      return { Loading: false, success: true };
    case UPDATE_SEANCE_FAIL:
      return { Loading: false, error: payload };
    case UPDATE_SEANCE_RESET:
      return {};
    default:
      return state;
  }
};

export const seanceDetailReducer = (state = { seance: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEANCE_REQUEST:
      return { Loading: true };
    case GET_SEANCE_SUCCESS:
      return { Loading: false, seance: payload };
    case GET_SEANCE_FAIL:
      return { Loading: false, error: payload };
    case GET_SEANCE_RESET:
      return {};
    default:
      return state;
  }
};
