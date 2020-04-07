import {Auth} from '../actionTypes'

export const userLoginInitiate = (data) =>({
  type: Auth.USER_LOGIN_INITIATE,
  payload: data
})

export const userLoginSuccess = (data) =>({
  type: Auth.USER_LOGIN_SUCCESS,
  payload: data
})

export const userLoginError = (data) =>({
  type: Auth.USER_LOGIN_ERROR,
  payload: data
})

export const createCustomerInitiate = (data) =>({
  type: Auth.CREATE_CUSTOMER_INITIATE,
  payload: data
})

export const createCustomerSuccess = (data) =>({
  type: Auth.CREATE_CUSTOMER_SUCCESS,
  payload: data
})

export const createCustomerError = (data) =>({
  type: Auth.CREATE_CUSTOMER_ERROR,
  payload: data
})

export const createOrganizationInitiate = (data) =>({
  type: Auth.CREATE_ORGANIZATION_INITIATE,
  payload: data
})

export const createOrganizationSuccess = (data) =>({
  type: Auth.CREATE_ORGANIZATION_SUCCESS,
  payload: data
})

export const createOrganizationError = (data) =>({
  type: Auth.CREATE_ORGANIZATION_ERROR,
  payload: data
})

export const removeAuthToaster = () =>({
  type: Auth.REMOVE_AUTH_TOASTER
})

export const clearAuthState = () => ({
  type: Auth.CLEAR_AUTH_STATE
})





