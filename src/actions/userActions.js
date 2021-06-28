import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  COACH_LIST_REQUEST,
  COACH_LIST_SUCCESS,
  COACH_LIST_FAIL,
  RESPONSABLE_LIST_REQUEST,
  RESPONSABLE_LIST_SUCCESS,
  RESPONSABLE_LIST_FAIL,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_FAIL,
  CLIENT_INFO_REQUEST,
  CLIENT_INFO_SUCCESS,
  CLIENT_INFO_FAIL,
  EMPLOYE_INFO_REQUEST,
  EMPLOYE_INFO_SUCCESS,
  EMPLOYE_INFO_FAIL,
  EMPLOYE_DELETE_REQUEST,
  EMPLOYE_DELETE_SUCCESS,
  EMPLOYE_DELETE_FAIL,
  CLIENT_DELETE_REQUEST,
  CLIENT_DELETE_SUCCESS,
  CLIENT_DELETE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  ADD_RESPONSABLE_REQUEST,
  ADD_RESPONSABLE_SUCCESS,
  ADD_RESPONSABLE_FAIL,
  ADD_COACH_REQUEST,
  ADD_COACH_SUCCESS,
  ADD_COACH_FAIL,
  GET_USER_IMAGE_REQUEST,
  GET_USER_IMAGE_SUCCESS,
  GET_USER_IMAGE_FAIL,
  DELETE_USER_IMAGE_REQUEST,
  DELETE_USER_IMAGE_SUCCESS,
  DELETE_USER_IMAGE_FAIL,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
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
  GET_ANALYTICS_REQUEST,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/login',
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (
    CIN,
    email,
    password,
    firstName,
    genre,
    dateNaissance,
    lastName,
    phoneNumber
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/register',

        {
          email,
          password,
          profil: {
            nom: lastName,
            prenom: firstName,
            cin: CIN,
            dateNaissance,
            genre,
            telephone: phoneNumber,
          },
        },

        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
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
    const { data } = await axios.get(`/api/user/profil`, config);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getResponsables = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESPONSABLE_LIST_REQUEST,
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
      `/api/admin/responsables?pageNo=${pageNo}&pageSize=${2}`,
      config
    );
    dispatch({ type: RESPONSABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESPONSABLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCoachs = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COACH_LIST_REQUEST,
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
      `/api/admin/coachs?pageNo=${pageNo}&pageSize=${2}`,
      config
    );
    dispatch({ type: COACH_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COACH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEmploye = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_INFO_REQUEST,
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
    const { data } = await axios.get(`/api/admin/employes/${id}`, config);
    dispatch({ type: EMPLOYE_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYE_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getClients = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENTS_LIST_REQUEST,
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
      `/api/admin/clients?pageNo=${pageNo}&pageSize=${2}`,
      config
    );
    dispatch({ type: CLIENTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_INFO_REQUEST,
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
    const { data } = await axios.get(`/api/admin/clients/${id}`, config);
    dispatch({ type: CLIENT_INFO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CLIENT_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEmploye = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYE_DELETE_REQUEST,
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
    await axios.delete(`/api/admin/employes/${id}`, config);
    dispatch({ type: EMPLOYE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: EMPLOYE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteClient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_DELETE_REQUEST,
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
    await axios.delete(`/api/admin/clients/${id}`, config);
    dispatch({ type: CLIENT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CLIENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile =
  (firstName, lastName, phoneNumber, dateNaissance, genre, cin) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
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
      const { data } = await axios.put(
        `/api/user/profil`,
        {
          prenom: firstName,
          nom: lastName,
          telephone: phoneNumber,
          dateNaissance,
          genre,
          cin,
        },
        config
      );
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const updatePassword = (password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
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
    const { data } = await axios.put(
      `/api/user/password`,
      {
        password,
      },
      config
    );
    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addResponsable =
  (CIN, firstName, lastName, email, dateNaissance, genre, phoneNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_RESPONSABLE_REQUEST,
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
        '/api/admin/responsable',
        {
          email,
          profil: {
            cin: CIN,
            prenom: firstName,
            nom: lastName,
            telephone: phoneNumber,
            dateNaissance,
            genre,
          },
        },
        config
      );
      dispatch({ type: ADD_RESPONSABLE_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_RESPONSABLE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addCoach =
  (CIN, firstName, lastName, email, dateNaissance, genre, phoneNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_COACH_REQUEST,
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
        '/api/admin/coach',
        {
          email,
          profil: {
            cin: CIN,
            prenom: firstName,
            nom: lastName,
            telephone: phoneNumber,
            dateNaissance,
            genre,
          },
        },
        config
      );
      dispatch({ type: ADD_COACH_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_COACH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addClient =
  (CIN, email, firstName, genre, dateNaissance, lastName, phoneNumber) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_CLIENT_REQUEST,
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
        '/api/responsable/clients',
        {
          email,
          profil: {
            cin: CIN,
            prenom: firstName,
            nom: lastName,
            telephone: phoneNumber,
            dateNaissance,
            genre,
          },
        },
        config
      );
      dispatch({ type: ADD_CLIENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADD_CLIENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyImage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_IMAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `${userInfo.jwt}`,
      },
      responseType: 'arraybuffer',
    };
    const response = await axios.get(`/api/user/image`, config);
    let blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    let image = URL.createObjectURL(blob);
    dispatch({ type: GET_USER_IMAGE_SUCCESS, payload: image });
  } catch (error) {
    dispatch({
      type: GET_USER_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMyImage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_IMAGE_REQUEST,
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
    await axios.delete(`/api/user/image`, config);
    dispatch({ type: DELETE_USER_IMAGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USER_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_REGISTER_RESET });
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: LIST_FACTURES_RESET });
};

export const createCart = (serviceId, qte) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CART_REQUEST,
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
      '/api/client/cart',
      {
        achatDetails: [{ service: { id: serviceId }, qte }],
      },
      config
    );
    dispatch({ type: CREATE_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: CREATE_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CART_REQUEST,
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
    const { data } = await axios.get('/api/client/cart', config);
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const reglerAchat = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGLER_ACHAT_REQUEST,
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
    const { data } = await axios.post(`/api/client/factures/`, null, config);
    dispatch({ type: REGLER_ACHAT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGLER_ACHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FROM_CART_REQUEST,
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
    await axios.delete(`/api/client/cart/services/${id}`, config);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getClientFacture = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_FACTURES_REQUEST,
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
      `/api/client/factures?pageNo=${pageNo}&pageSize=${3}`,
      config
    );
    dispatch({ type: LIST_FACTURES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_FACTURES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllFactures = (pageNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_FACTURES_ADMIN_REQUEST,
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
      `/api/admin/factures?pageNo=${pageNo}&pageSize=${4}`,
      config
    );
    dispatch({ type: LIST_FACTURES_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_FACTURES_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFactureDetailAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FACTURE_DETAIL_ADMIN_REQUEST,
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
    const { data } = await axios.get(`/api/admin/factures/${id}`, config);
    dispatch({ type: FACTURE_DETAIL_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FACTURE_DETAIL_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSeances = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_SEANCES_REQUEST,
    });
    const { data } = await axios.get(`/api/seances`);
    dispatch({ type: LIST_SEANCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_SEANCES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkCoupon = (reference) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHECK_COUPON_REQUEST,
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
    const { data } = await axios.get(`/api/client/coupon/${reference}`, config);
    dispatch({ type: CHECK_COUPON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CHECK_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAnalyticsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ANALYTICS_REQUEST,
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
    const { data } = await axios.get(`/api/admin/analytics`, config);
    dispatch({ type: GET_ANALYTICS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ANALYTICS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
