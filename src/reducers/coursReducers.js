import {
  COURS_LIST_REQUEST,
  COURS_LIST_FAIL,
  COURS_LIST_SUCCESS,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAIL,
} from '../constants/coursConstants';
import {
  SERVICES_LIST_REQUEST,
  SERVICES_LIST_SUCCESS,
  SERVICES_LIST_FAIL,
  SERVICES_DETAIL_REQUEST,
  SERVICES_DETAIL_SUCCESS,
  SERVICES_DETAIL_FAIL,
} from '../constants/userConstants';

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

export const servicesListReducer = (state = { services: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVICES_LIST_REQUEST:
      return { Loading: true };
    case SERVICES_LIST_SUCCESS:
      return { Loading: false, services: payload };
    case SERVICES_LIST_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const serviceDetailReducer = (state = { service: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SERVICES_DETAIL_REQUEST:
      return { Loading: true };
    case SERVICES_DETAIL_SUCCESS:
      return { Loading: false, service: payload };
    case SERVICES_DETAIL_FAIL:
      return { Loading: false, error: payload };
    default:
      return state;
  }
};

export const courseAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_COURSE_REQUEST:
      return { Loading: true };
    case ADD_COURSE_SUCCESS:
      return { Loading: false, successAdd: true };
    case ADD_COURSE_FAIL:
      return { Loading: false, errorAdd: payload };
    default:
      return state;
  }
};
