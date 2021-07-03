import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  COACH_LIST_REQUEST,
  COACH_LIST_SUCCESS,
  COACH_LIST_FAIL,
  COACH_LIST_RESET,
  RESPONSABLE_LIST_REQUEST,
  RESPONSABLE_LIST_SUCCESS,
  RESPONSABLE_LIST_FAIL,
  RESPONSABLE_LIST_RESET,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_FAIL,
  CLIENTS_LIST_RESET,
  CLIENT_INFO_REQUEST,
  CLIENT_INFO_SUCCESS,
  CLIENT_INFO_FAIL,
  CLIENT_INFO_RESET,
  EMPLOYE_INFO_REQUEST,
  EMPLOYE_INFO_SUCCESS,
  EMPLOYE_INFO_FAIL,
  EMPLOYE_INFO_RESET,
  EMPLOYE_DELETE_REQUEST,
  EMPLOYE_DELETE_SUCCESS,
  EMPLOYE_DELETE_FAIL,
  CLIENT_DELETE_REQUEST,
  CLIENT_DELETE_SUCCESS,
  CLIENT_DELETE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_RESET,
  ADD_RESPONSABLE_REQUEST,
  ADD_RESPONSABLE_SUCCESS,
  ADD_RESPONSABLE_FAIL,
  ADD_COACH_REQUEST,
  ADD_COACH_SUCCESS,
  ADD_COACH_FAIL,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  GET_USER_IMAGE_REQUEST,
  GET_USER_IMAGE_SUCCESS,
  GET_USER_IMAGE_FAIL,
  GET_USER_IMAGE_RESET,
  DELETE_USER_IMAGE_REQUEST,
  DELETE_USER_IMAGE_SUCCESS,
  DELETE_USER_IMAGE_FAIL,
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  CREATE_CART_RESET,
  REGLER_ACHAT_REQUEST,
  REGLER_ACHAT_SUCCESS,
  REGLER_ACHAT_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  LIST_FACTURES_REQUEST,
  LIST_FACTURES_SUCCESS,
  LIST_FACTURES_FAIL,
  LIST_FACTURES_RESET,
  LIST_FACTURES_ADMIN_REQUEST,
  LIST_FACTURES_ADMIN_SUCCESS,
  LIST_FACTURES_ADMIN_FAIL,
  LIST_FACTURES_ADMIN_RESET,
  FACTURE_DETAIL_ADMIN_REQUEST,
  FACTURE_DETAIL_ADMIN_SUCCESS,
  FACTURE_DETAIL_ADMIN_FAIL,
  LIST_SEANCES_REQUEST,
  LIST_SEANCES_SUCCESS,
  LIST_SEANCES_FAIL,
  CHECK_COUPON_REQUEST,
  CHECK_COUPON_SUCCESS,
  CHECK_COUPON_FAIL,
  CHECK_COUPON_RESET,
  GET_ANALYTICS_REQUEST,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
  REGLER_ACHAT_RESET,
  GET_FACTURE_PDF_REQUEST,
  GET_FACTURE_PDF_SUCCESS,
  GET_FACTURE_PDF_FAIL,
  GET_SEANCES_REQUEST,
  GET_SEANCES_SUCCESS,
  GET_SEANCES_FAIL,
} from '../constants/userConstants';

export const loginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return { Loading: true };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        Loading: false,
        userInfo: payload,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST: {
      return { Loading: true };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        Loading: false,
        userInfo: payload,
      };
    }
    case USER_REGISTER_FAIL: {
      return {
        Loading: false,
        error: payload,
      };
    }
    case USER_REGISTER_RESET: {
      return {};
    }
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE_REQUEST:
      return { Loading: true };
    case USER_PROFILE_SUCCESS:
      return { Loading: false, user: payload };
    case USER_PROFILE_FAIL:
      return { Loading: false, error: payload };
    case USER_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const responsablesListReducer = (
  state = { responsables: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case RESPONSABLE_LIST_REQUEST:
      return { Loading: true };
    case RESPONSABLE_LIST_SUCCESS:
      return {
        Loading: false,
        responsables: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case RESPONSABLE_LIST_FAIL:
      return { Loading: false, error: payload };
    case RESPONSABLE_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const coachsListReducer = (state = { coachs: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case COACH_LIST_REQUEST:
      return { Loading: true };
    case COACH_LIST_SUCCESS:
      return {
        Loading: false,
        coachs: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case COACH_LIST_FAIL:
      return { Loading: false, error: payload };
    case COACH_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const clientsListReducer = (state = { clients: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLIENTS_LIST_REQUEST:
      return { Loading: true };
    case CLIENTS_LIST_SUCCESS:
      return {
        Loading: false,
        clients: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case CLIENTS_LIST_FAIL:
      return { Loading: false, error: payload };
    case CLIENTS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const clientInfosReducer = (state = { client: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_INFO_REQUEST:
      return { Loading: true };
    case CLIENT_INFO_SUCCESS:
      return { Loading: false, client: payload };
    case CLIENT_INFO_FAIL:
      return { Loading: false, error: payload };
    case CLIENT_INFO_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const employeInfosReducer = (state = { employe: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYE_INFO_REQUEST:
      return { Loading: true };
    case EMPLOYE_INFO_SUCCESS:
      return { Loading: false, employe: payload };
    case EMPLOYE_INFO_FAIL:
      return { Loading: false, error: payload };
    case EMPLOYE_INFO_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const clientDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLIENT_DELETE_REQUEST:
      return { Loading: true };
    case CLIENT_DELETE_SUCCESS:
      return { Loading: false, successDelete: true };
    case CLIENT_DELETE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};

export const employeDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYE_DELETE_REQUEST:
      return { Loading: true };
    case EMPLOYE_DELETE_SUCCESS:
      return { Loading: false, successDelete: true };
    case EMPLOYE_DELETE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { Loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { Loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { Loading: false, error: payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const passwordUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PASSWORD_REQUEST:
      return { Loading: true };
    case USER_UPDATE_PASSWORD_SUCCESS:
      return { Loading: false, passwordSuccess: true };
    case USER_UPDATE_PASSWORD_FAIL:
      return { Loading: false, error: payload };
    case USER_UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const clientAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CLIENT_REQUEST:
      return { Loading: true };
    case ADD_CLIENT_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_CLIENT_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const responsableAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_RESPONSABLE_REQUEST:
      return { Loading: true };
    case ADD_RESPONSABLE_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_RESPONSABLE_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const coachAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_COACH_REQUEST:
      return { Loading: true };
    case ADD_COACH_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_COACH_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};

export const userImageReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_IMAGE_REQUEST:
      return { Loading: true };
    case GET_USER_IMAGE_SUCCESS:
      return { Loading: false, image: payload };
    case GET_USER_IMAGE_FAIL:
      return { Loading: false, error: payload };
    case GET_USER_IMAGE_RESET:
      return { image: {} };
    default:
      return state;
  }
};

export const cartReducer = (state = { cart: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CART_REQUEST:
      return { Loading: true };
    case GET_CART_SUCCESS:
      return { Loading: false, cart: payload };
    case GET_CART_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const addCartReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CART_REQUEST:
      return { Loading: true };
    case CREATE_CART_SUCCESS:
      return { Loading: false, success: true };
    case CREATE_CART_FAIL:
      return { Loading: false, error: payload };
    case CREATE_CART_RESET:
      return {};
    default:
      return state;
  }
};

export const clientRemoveItemReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REMOVE_FROM_CART_REQUEST:
      return { Loading: true };
    case REMOVE_FROM_CART_SUCCESS:
      return { Loading: false, successDelete: true };
    case REMOVE_FROM_CART_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};

export const userDeleteImageReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_USER_IMAGE_REQUEST:
      return { Loading: true };
    case DELETE_USER_IMAGE_SUCCESS:
      return { Loading: false, successDelete: true };
    case DELETE_USER_IMAGE_FAIL:
      return { Loading: false, errorDelete: payload };
    default:
      return state;
  }
};

export const achatRegleReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGLER_ACHAT_REQUEST:
      return { Loading: true };
    case REGLER_ACHAT_SUCCESS:
      return { Loading: false, successPay: true };
    case REGLER_ACHAT_FAIL:
      return { Loading: false, errorPay: payload };
    case REGLER_ACHAT_RESET:
      return {};
    default:
      return state;
  }
};

export const clientListFacturesReducer = (state = { factures: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_FACTURES_REQUEST:
      return { Loading: true };
    case LIST_FACTURES_SUCCESS:
      return {
        Loading: false,
        factures: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case LIST_FACTURES_FAIL:
      return { Loading: false, error: payload };
    case LIST_FACTURES_RESET:
      return { factures: [] };
    default:
      return state;
  }
};

export const clientsListFacturesAdminReducer = (
  state = { factures: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_FACTURES_ADMIN_REQUEST:
      return { Loading: true };
    case LIST_FACTURES_ADMIN_SUCCESS:
      return {
        Loading: false,
        factures: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case LIST_FACTURES_ADMIN_FAIL:
      return { Loading: false, error: payload };
    case LIST_FACTURES_ADMIN_RESET:
      return { factures: [] };
    default:
      return state;
  }
};

export const detailFactureAdminReducer = (state = { facture: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case FACTURE_DETAIL_ADMIN_REQUEST:
      return { Loading: true };
    case FACTURE_DETAIL_ADMIN_SUCCESS:
      return {
        Loading: false,
        facture: payload,
      };
    case FACTURE_DETAIL_ADMIN_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const listSeancesReducer = (state = { seances: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case LIST_SEANCES_REQUEST:
      return { Loading: true };
    case LIST_SEANCES_SUCCESS:
      return {
        Loading: false,
        seances: payload.content,
        itemsCountPerPage: payload.size,
        totalPages: payload.totalPages,
        totalElements: payload.totalElements,
      };
    case LIST_SEANCES_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const couponCheckReducer = (state = { coupon: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_COUPON_REQUEST:
      return { Loading: true };
    case CHECK_COUPON_SUCCESS:
      return {
        Loading: false,
        coupon: payload,
      };
    case CHECK_COUPON_FAIL:
      return { Loading: false, error: payload };
    case CHECK_COUPON_RESET:
      return {};
    default:
      return state;
  }
};

export const anlyticsAdminReducer = (state = { analytics: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ANALYTICS_REQUEST:
      return { Loading: true };
    case GET_ANALYTICS_SUCCESS:
      return {
        Loading: false,
        analytics: payload,
      };
    case GET_ANALYTICS_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const clientFactureReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FACTURE_PDF_REQUEST:
      return { Loading: true };
    case GET_FACTURE_PDF_SUCCESS:
      return { Loading: false, facture: payload };
    case GET_FACTURE_PDF_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const listSeancesUserReducer = (state = { seances: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEANCES_REQUEST:
      return { Loading: true };
    case GET_SEANCES_SUCCESS:
      return {
        Loading: false,
        seances: payload.content,
      };
    case GET_SEANCES_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};
