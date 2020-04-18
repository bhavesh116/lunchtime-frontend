import { OrganizationActions } from '../../actionTypes'

const { customersTab } = OrganizationActions

export const getCustomersInitiate = (data) => ({
  type: customersTab.GET_CUSTOMERS_INITIATE,
  payload: data
})

export const getCustomersSuccess = (data) => ({
  type: customersTab.GET_CUSTOMERS_SUCCESS,
  payload: data
})

export const getCustomersFailure = (data) => ({
  type: customersTab.GET_CUSTOMERS_FAILURE,
  payload: data
})

export const getRequestsInitiate= (data) => ({
  type: customersTab.GET_REQUESTS_INITIATE,
  payload: data
})
  
export const getRequestsSuccess = (data) => ({
  type: customersTab.GET_REQUESTS_SUCCESS,
  payload: data
})
  
export const getRequestsFailure = (data) => ({
  type: customersTab.GET_REQUESTS_FAILURE,
  payload: data
})

export const removeCustomerInitiate = (data) => ({
  type: customersTab.REMOVE_CUSTOMER_INITIATE,
  payload: data
})
    
export const removeCustomerSuccess = (data) => ({
  type: customersTab.REMOVE_CUSTOMER_SUCCESS,
  payload: data
})
    
export const removeCustomerFailure = (data) => ({
  type: customersTab.REMOVE_CUSTOMER_FAILURE, 
  payload: data
})

export const acceptRejectCustomerInitate = (data) => ({
  type: customersTab.ACCEPT_REJECT_CUSTOMER_INITIATE,
  payload: data
})
    
export const acceptRejectCustomerSuccess = (data) => ({
  type: customersTab.ACCEPT_REJECT_CUSTOMER_SUCCESS,
  payload: data
})
    
export const acceptRejectCustomerFailure = (data) => ({
  type: customersTab.ACCEPT_REJECT_CUSTOMER_FAILURE, 
  payload: data
})

export const removeCustomerToast = () => ({
  type: customersTab.REMOVE_CUSTOMERS_TOAST
})

