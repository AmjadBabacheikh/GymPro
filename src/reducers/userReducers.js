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
  EMPLOYES_LIST_REQUEST,
  EMPLOYES_LIST_SUCCESS,
  EMPLOYES_LIST_FAIL,
  EMPLOYES_LIST_RESET,
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

export const emoloyesListReducer = (state = { employes: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case EMPLOYES_LIST_REQUEST:
      return { Loading: true };
    case EMPLOYES_LIST_SUCCESS:
      return { Loading: false, employes: payload.content };
    case EMPLOYES_LIST_FAIL:
      return { Loading: false, error: payload };
    case EMPLOYES_LIST_RESET:
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
      return { Loading: false, clients: payload.content };
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