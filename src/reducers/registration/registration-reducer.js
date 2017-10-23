
import {
  getRegistrations,
  GET_REGISTRATIONS
} from './registration-actions';


const registrationReducer = (state = getRegistrations(), action) => {
  let newState;

  switch (action.type) {
    case GET_REGISTRATIONS:
      newState = Object.assign({}, action.registrations);
      break;
    default:
      newState = state;
  }

  if (newState !== state) {
    // only log if state has changed
    // log('action:', action, 'state:', state, 'newState:', newState);
  }

  return newState;
};

export default registrationReducer;
