import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  loginReducer,
  registerReducer,
  userProfileReducer,
  responsablesListReducer,
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
  coachsListReducer,
  addCartReducer,
  cartReducer,
} from './reducers/userReducers';
import {
  coursListReducer,
  serviceDetailReducer,
  servicesListReducer,
  courseAddReducer,
} from './reducers/coursReducers.js';
import {
  abonnementAddReducer,
  couponAddReducer,
} from './reducers/responsableReducer.js';

const userLoginFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const reducer = combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  userProfile: userProfileReducer,
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
  abonnementAdd: abonnementAddReducer,
  serviceDetail: serviceDetailReducer,
  servicesList: servicesListReducer,
  responsablesList: responsablesListReducer,
  coachsList: coachsListReducer,
  courseAdd: courseAddReducer,
  addCart: addCartReducer,
  userCart: cartReducer,
  couponAdd: couponAddReducer,
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
