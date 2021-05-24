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
