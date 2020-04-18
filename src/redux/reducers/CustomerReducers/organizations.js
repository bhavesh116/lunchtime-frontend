import { CustomerActions } from '../../actionTypes'

const { organizationsTab } = CustomerActions

const initialState = {
  organizations: [],
  organizationsLoader: false,
  tabText: "",
  searchedOrg: {},
  searchOrgLoader: false,
  refreshF: false,
  requestLoader: false,
  disconnectLoader: false,
  sendReqSuccess: false,
  sendReqFailure: false,
  disconnectSuccess: false,
  disconnectFailure: false,
  toasterShow: false,
}

const organizationTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case organizationsTab.GET_ORGANIZTIONS_INITIATE :
        return { ...state, organizationsLoader: true }

      case organizationsTab.GET_ORGANIZTIONS_SUCCESS :
        return { ...state, organizationsLoader: false, organizations: payload, refreshF: !state.refreshF }

      case organizationsTab.GET_ORGANIZTIONS_FAILURE :
        return { ...state, organizationsLoader: false, tabText: payload, refreshF: !state.refreshF }  

      case organizationsTab.SEARCH_ORGANIZTION_INITIATE :
        return { ...state, searchOrgLoader: true }
    
      case organizationsTab.SEARCH_ORGANIZTION_SUCCESS :
        return { ...state, searchOrgLoader: false, searchedOrg: payload }
    
      case organizationsTab.SEARCH_ORGANIZTION_FAILURE :
        return { ...state, searchOrgLoader: false , searchedOrg: {}}

      case organizationsTab.SEND_UNSEND_REQUEST_INITIATE :
        return { ...state, requestLoader: true }
        
      case organizationsTab.SEND_UNSEND_REQUEST_SUCCESS :
        return { ...state, requestLoader: false , sendReqSuccess: true, tabText: payload, toasterShow: true}
        
      case organizationsTab.SEND_UNSEND_REQUEST_FAILURE :
        return { ...state, requestLoader: false, sendReqFailure: true, tabText: payload, toasterShow: true}
        
      case organizationsTab.DISCONNECT_FROM_ORG_INITIATE :
          return { ...state, disconnectLoader: true }
          
      case organizationsTab.DISCONNECT_FROM_ORG_SUCCESS :
          return { ...state, disconnectLoader: false, disconnectSuccess: true, tabText: payload, toasterShow: true }
          
      case organizationsTab.DISCONNECT_FROM_ORG_FAILURE :
          return { ...state, disconnectLoader: false, disconnectFailure: true,  tabText: payload, toasterShow: true } 
      
      case organizationsTab.REMOVE_CUSTOMER_TAB_TOASTER:
            return  { ...state, tabText: "", sendReqSuccess: false , toasterShow: false, sendReqFailure: false, disconnectFailure: false, disconnectSuccess: false }    
  
       default:
        return { ...state }
    }
}

export default organizationTabReducer;