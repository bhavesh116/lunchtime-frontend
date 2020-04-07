import { CustomerActions } from '../../actionTypes'

const { organizationsTab } = CustomerActions

export const getOrganizationsInitiate = (data) => ({
  type: organizationsTab.GET_ORGANIZTIONS_INITIATE,
  payload: data
})

export const getOrganizationsSuccess = (data) => ({
  type: organizationsTab.GET_ORGANIZTIONS_SUCCESS,
  payload: data
})

export const getOrganizationsFailure = (data) => ({
  type: organizationsTab.GET_ORGANIZTIONS_FAILURE,
  payload: data
})

export const searchOrganizationInitiate = (data) => ({
  type: organizationsTab.SEARCH_ORGANIZTION_INITIATE,
  payload: data
})
  
export const searchOrganizationSuccess = (data) => ({
  type: organizationsTab.SEARCH_ORGANIZTION_SUCCESS,
  payload: data
})
  
export const searchOrganizationFailure = (data) => ({
  type: organizationsTab.SEARCH_ORGANIZTION_FAILURE,
  payload: data
})

export const sendUnsendRequestInitiate = (data) => ({
  type: organizationsTab.SEND_UNSEND_REQUEST_INITIATE,
  payload: data
})
    
export const sendUnsendRequestSuccess = (data) => ({
  type: organizationsTab.SEND_UNSEND_REQUEST_SUCCESS,
  payload: data
})
    
export const sendUnsendRequestFailure = (data) => ({
  type: organizationsTab.SEND_UNSEND_REQUEST_FAILURE, 
  payload: data
})

export const disconnectFromOrgInitiate = (data) => ({
  type: organizationsTab.DISCONNECT_FROM_ORG_INITIATE,
  payload: data
})
    
export const disconnectFromOrgSuccess = (data) => ({
  type: organizationsTab.DISCONNECT_FROM_ORG_SUCCESS,
  payload: data
})
    
export const disconnectFromOrgFailure = (data) => ({
  type: organizationsTab.DISCONNECT_FROM_ORG_FAILURE, 
  payload: data
})

export const removeToaster = () => ({
  type: organizationsTab.REMOVE_CUSTOMER_TAB_TOASTER
})