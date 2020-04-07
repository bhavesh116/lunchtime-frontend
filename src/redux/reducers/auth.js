import { Auth } from '../actionTypes'
const initialState = {
    userId: "",
    userType: "",
    userToken: "",
    authSuccess: false,
    authFailure: false,
    loginSuccess: false,
    loginFailure: false,
    authText: "",
    loginLoader: false,
    signUpLoader: false,
}

const authReducer = ( state = initialState, { type, payload } ) =>{
    switch(type) {
      case Auth.USER_LOGIN_INITIATE :
        return { ...state, loginLoader: true }

      case Auth.USER_LOGIN_SUCCESS :
        return { ...state, loginLoader: false, loginSuccess: true, userId: payload.userId, userType: payload.userType, userToken: payload.userToken }

      case Auth.USER_LOGIN_ERROR :
        return  { ...state, loginLoader: false, loginFailure: true, authText: payload, authFailure: true}

      case Auth.CREATE_CUSTOMER_INITIATE :
        return { ...state, signUpLoader: true }
 
      case Auth.CREATE_CUSTOMER_SUCCESS :
        return { ...state, signUpLoader: false, authSuccess: true, authText: payload }
 
      case Auth.CREATE_CUSTOMER_ERROR :
        return  { ...state, signUpLoader: false, authText: payload, authFailure: true }

      case Auth.CREATE_ORGANIZATION_INITIATE :
        return { ...state, signUpLoader: true }
  
      case Auth.CREATE_ORGANIZATION_SUCCESS :
        return { ...state, signUpLoader: false, authSuccess: true, authText: payload }
  
      case Auth.CREATE_ORGANIZATION_ERROR :
        return  { ...state, signUpLoader: false, authText: payload, authFailure: true}

      case Auth.CLEAR_AUTH_STATE :
        return  { state: initialState }
      
      case Auth.REMOVE_AUTH_TOASTER :
        return  { ...state, authSuccess: false, authText: "", loginSuccess: false, loginFailure: false, authFailure: false  }  
  
       default:
         return { ...state }
    }
}

export default authReducer;