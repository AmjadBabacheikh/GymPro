import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginReducer,
  registerReducer,
  userProfileReducer,
  emoloyesListReducer,
  clientsListReducer,
  clientInfosReducer,
  employeInfosReducer,
  clientDeleteReducer,
  employeDeleteReducer,
  profileUpdateReducer,
  passwordUpdateReducer,
  coachAddReducer,
  clientAddReducer,
  responsableAddReducer,
  userImageReducer,
  userDeleteImageReducer,
} from './reducers/userReducers';
import { coursListReducer } from './reducers/coursReducers.js';

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  userProfile: userProfileReducer,
  emoloyesList: emoloyesListReducer,
  clientsList: clientsListReducer,
  clientInfos: clientInfosReducer,
  employeInfos: employeInfosReducer,
  clientDelete: clientDeleteReducer,
  employeDelete: employeDeleteReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: passwordUpdateReducer,
  coursList: coursListReducer,
  coachAdd: coachAddReducer,
  clientAdd: clientAddReducer,
  responsableAdd: responsableAddReducer,
  userImage: userImageReducer,
  userDeleteImage: userDeleteImageReducer,
});
const initialState = {
  userLogin: {
    userInfo: userLoginFromStorage,
  },
};
const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
