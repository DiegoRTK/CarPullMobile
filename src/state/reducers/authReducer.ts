import {LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT} from '../actions/authActions';
const initialState: any | null = null;

const authReducer = (state: any | null = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      if (!action.payload) {
        return state;
      }
      const {
        accessToken,
        accountId,
        slug,
        conductorFinishRegistry,
        activeRole: loginActiveRole,
        username,
        phoneNumber,
      } = action.payload;
      return {
        ...state,
        access_token: accessToken,
        accountId,
        slug,
        username,
        phoneNumber,
        activeRole: loginActiveRole,
        conductorFinishRegistry,
      };
    case REGISTER_SUCCESS:
      if (!action.payload) {
        return state;
      }
      const {
        activeRole: registerActiveRole,
        username: registerUsername,
        phoneNumber: registerPhoneNumber,
      } = action.payload;
      return {
        ...state,
        activeRole: registerActiveRole,
        username: registerUsername,
        phoneNumber: registerPhoneNumber,
        conductorFinishRegistry: false,
      };
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

export default authReducer;
