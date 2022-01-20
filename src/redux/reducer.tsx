//initial state for variable
const initialState = {
    isSignout: true,
    accessToken: null,
  };
  //All possible operation/action for state change
  const AuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "SIGN_IN":
        return {
          ...state,
          isSignout: false,
          accessToken: action.accessToken,
        };
      case "RESTORE_TOKEN":
        return {
          ...state,
          isSignout: false,
          accessToken: action.accessToken,
        };
      default:
        return { ...state };
    }
  };
  
  export default AuthReducer;
  