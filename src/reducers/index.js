import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import users from "./users";
import user from './user/user-reducer';
import auth from './auth/auth-reducer';
import registration from './registration/registration-reducer';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer.plugin({
    "user_edit": (state, action) => {
      // reset form (wipe state) when navigating away from the User edit page
      switch(action.type) {
        case "@@router/LOCATION_CHANGE":
          return undefined;
        default:
          return state;
      }
    }
  }),
  users: users,
  auth,
  user,
  registration,
});
