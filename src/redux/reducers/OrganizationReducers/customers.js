import { OrganizationActions } from '../../actionTypes'

const { customersTab } = OrganizationActions

const initialState = {
  customers: [],
  customersLoader: false,
  tabText: "",
  requests:[],
  searchOrgLoader: false,
  refreshF: false,
  requestsLoader: false,
  removeCustomerLoader: false,
  acceptRejectLoader: false
}

const organizationTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case customersTab.GET_CUSTOMERS_INITIATE :
        return { ...state, customersLoader: true }

      case customersTab.GET_CUSTOMERS_SUCCESS :
        return { ...state, customersLoader: false, customers: payload, refreshF: !state.refreshF }

      case customersTab.GET_CUSTOMERS_FAILURE :
        return { ...state, customersLoader: false, tabText: payload, refreshF: !state.refreshF }  

      case customersTab.GET_REQUESTS_INITIATE :
        return { ...state, requestsLoader: true }
    
      case customersTab.GET_REQUESTS_SUCCESS :
        return { ...state, requestsLoader: false, requests: payload }
    
      case customersTab.GET_REQUESTS_FAILURE :
        return { ...state, requestsLoader: false, tabText: payload }

      case customersTab.REMOVE_CUSTOMER_INITIATE :
        return { ...state, removeCustomerLoader: true }
        
      case customersTab.REMOVE_CUSTOMER_SUCCESS :
        return { ...state, removeCustomerLoader: false , tabText: payload }
        
      case customersTab.REMOVE_CUSTOMER_FAILURE :
        return { ...state, removeCustomerLoader: false, tabText: payload }
        
      case customersTab.ACCEPT_REJECT_CUSTOMER_INITIATE :
          return { ...state, acceptRejectLoader: true }
          
      case customersTab.ACCEPT_REJECT_CUSTOMER_SUCCESS :
          return { ...state, acceptRejectLoader: false, tabText: payload }
          
      case customersTab.ACCEPT_REJECT_CUSTOMER_FAILURE :
          return { ...state, acceptRejectLoader: false, tabText: payload }

       case customersTab.REMOVE_CUSTOMERS_TOAST :
         return { ...state, tabText: "" }    
  
       default:
        return { ...state }
    }
}

export default organizationTabReducer;