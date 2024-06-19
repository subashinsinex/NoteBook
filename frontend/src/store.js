import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import 'thunk' directly from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

// Your reducer and other configurations
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk]; // Place 'thunk' inside an array for applyMiddleware

// Create store with middleware and devtools
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
