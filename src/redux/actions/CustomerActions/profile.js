import { CustomerActions } from '../../actionTypes'

const { profileTab } = CustomerActions 

export const getCustomerProfileInitiate = (data) => ({
 type: profileTab.GET_CUSTOMER_PROFILE_INITIATE,
 payload: data
})

export const getCustomerProfileSuccess = (data) => ({
 type: profileTab.GET_CUSTOMER_PROFILE_SUCCESS,
 payload: data
})

export const getCustomerProfileFailure = (data) => ({
 type: profileTab.GET_CUSTOMER_PROFILE_FAILURE,
 payload: data
})

export const updateCustomerProfileInitiate = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PROFILE_INITIATE,
 payload: data
})

export const updateCustomerProfileSuccess = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PROFILE_SUCCESS,
 payload: data
})

export const updateCustomerProfileFailure = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PROFILE_FAILURE,
 payload: data
})

export const updateCustomerPasswordInitiate = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PASSWORD_INITIATE,
 payload: data
})

export const updateCustomerPasswordSuccess = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PASSWORD_SUCCESS,
 payload: data
})

export const updateCustomerPasswordFailure = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_PASSWORD_FAILURE,
 payload: data
})

export const updateCustomerFavouritesInitiate = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_FAVOURITES_INITIATE,
 payload: data
})

export const updateCustomerFavouritesSuccess = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_FAVOURITES_SUCCESS,
 payload: data
})

export const updateCustomerFavouritesFailure = (data) => ({
 type: profileTab.UPDATE_CUSTOMER_FAVOURITES_FAILURE,
 payload: data
})

