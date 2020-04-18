import { CustomerActions } from '../../actionTypes'

const { profileTab } = CustomerActions

const initialState = {
 customerProfile: {},
 customerProfileLoader: false,
 profileText: '',
 updateCustomerLoader: false,
 favouritesLoader: false,
 updatePasswordLoader: false,
 refreshF: false,
 profileUpdateSuccess: false,
 updatePasswordSuccess: false
}

const profileTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case profileTab.GET_CUSTOMER_PROFILE_INITIATE :
        return { ...state, customerProfileLoader: true, profileUpdateSuccess: false, updatePasswordSuccess: false}

      case profileTab.GET_CUSTOMER_PROFILE_SUCCESS :
        return { ...state, customerProfileLoader: false, customerProfile: payload, refreshF: !state.refreshF }

      case profileTab.GET_CUSTOMER_PROFILE_FAILURE :
        return { ...state, customerProfileLoader: false, profileText: payload, refreshF: !state.refreshF }  

      case profileTab.UPDATE_CUSTOMER_PROFILE_INITIATE :
        return { ...state, updateCustomerLoader: true }
    
      case profileTab.UPDATE_CUSTOMER_PROFILE_SUCCESS :
        return { ...state, updateCustomerLoader: false, profileUpdateSuccess: true}
    
      case profileTab.UPDATE_CUSTOMER_PROFILE_FAILURE :
        return { ...state, updateCustomerLoader: false }

      case profileTab.UPDATE_CUSTOMER_FAVOURITES_INITIATE :
        return { ...state, favouritesLoader: true }
        
      case profileTab.UPDATE_CUSTOMER_FAVOURITES_SUCCESS :
        return { ...state, favouritesLoader: false }
        
      case profileTab.UPDATE_CUSTOMER_FAVOURITES_FAILURE :
        return { ...state, favouritesLoader: false, profileText: payload }
        
      case profileTab.UPDATE_CUSTOMER_PASSWORD_INITIATE :
          return { ...state, updatePasswordLoader: true }
          
      case profileTab.UPDATE_CUSTOMER_PASSWORD_SUCCESS :
          return { ...state, updatePasswordLoader: false, updatePasswordSuccess: true }
          
      case profileTab.UPDATE_CUSTOMER_PASSWORD_FAILURE :
          return { ...state, updatePasswordLoader: false, profileText: payload }    
  
       default:
        return { ...state }
    }
}

export default profileTabReducer;