import { OrganizationActions } from '../../actionTypes'

const { orgProfileTab } = OrganizationActions 

export const getOrganizationProfileInitiate = (data) => ({
 type: orgProfileTab.GET_ORGANIZATION_PROFILE_INITIATE,
 payload: data
})

export const getOrganizationProfileSuccess = (data) => ({
 type: orgProfileTab.GET_ORGANIZATION_PROFILE_SUCCESS,
 payload: data
})

export const getOrganizationProfileFailure = (data) => ({
 type: orgProfileTab.GET_ORGANIZATION_PROFILE_FAILURE,
 payload: data
})

export const updateOrganizationProfileInitiate = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PROFILE_INITIATE,
 payload: data
})

export const updateOrganizationProfileSuccess = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PROFILE_SUCCESS,
 payload: data
})

export const updateOrganizationProfileFailure = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PROFILE_FAILURE,
 payload: data
})

export const updateOrganizationPasswordInitiate = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_INITIATE,
 payload: data
})

export const updateOrganizationPasswordSuccess = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_SUCCESS,
 payload: data
})

export const updateOrganizationPasswordFailure = (data) => ({
 type: orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_FAILURE,
 payload: data
})

export const removeOrgProfileToast = () => ({
 type: orgProfileTab.REMOVE_ORG_PROFILE_TOAST
})
