import { OrganizationActions } from '../../actionTypes'

const { menuTab } = OrganizationActions

export const getOrgMenusInitiate = (data) => ({
  type: menuTab.GET_ORG_MENUS_INITIATE,
  payload: data
})

export const getOrgMenusSuccess = (data) => ({
  type: menuTab.GET_ORG_MENUS_SUCCESS,
  payload: data
})

export const getOrgMenusFailure = (data) => ({
  type: menuTab.GET_ORG_MENUS_FAILURE,
  payload: data
})

export const createNewMenuInitiate= (data) => ({
  type: menuTab.CREATE_NEW_MENU_INITIATE,
  payload: data
})
  
export const createNewMenuSuccess = (data) => ({
  type: menuTab.CREATE_NEW_MENU_SUCCESS,
  payload: data
})
  
export const createNewMenuFailure = (data) => ({
  type: menuTab.CREATE_NEW_MENU_FAILURE,
  payload: data
})

export const menuActionInitiate = (data) => ({
  type: menuTab.MENU_ACTION_INITIATE,
  payload: data
})
    
export const menuActionSuccess = (data) => ({
  type: menuTab.MENU_ACTION_SUCCESS,
  payload: data
})
    
export const menuActionFailure = (data) => ({
  type: menuTab.MENU_ACTION_FAILURE, 
  payload: data
})

export const removeMenuToast = () => ({
  type: menuTab.REMOVE_MENU_TOAST
})

