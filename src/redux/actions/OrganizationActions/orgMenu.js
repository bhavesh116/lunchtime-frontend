import { OrganizationActions } from '../../actionTypes'

const { orgMenuTab } = OrganizationActions

export const getOrgMenusInitiate = (data) => ({
  type: orgMenuTab.GET_ORG_MENUS_INITIATE,
  payload: data
})

export const getOrgMenusSuccess = (data) => ({
  type: orgMenuTab.GET_ORG_MENUS_SUCCESS,
  payload: data
})

export const getOrgMenusFailure = (data) => ({
  type: orgMenuTab.GET_ORG_MENUS_FAILURE,
  payload: data
})

export const createNewMenuInitiate= (data) => ({
  type: orgMenuTab.CREATE_NEW_MENU_INITIATE,
  payload: data
})
  
export const createNewMenuSuccess = (data) => ({
  type: orgMenuTab.CREATE_NEW_MENU_SUCCESS,
  payload: data
})
  
export const createNewMenuFailure = (data) => ({
  type: orgMenuTab.CREATE_NEW_MENU_FAILURE,
  payload: data
})

export const menuActionInitiate = (data) => ({
  type: orgMenuTab.MENU_ACTION_INITIATE,
  payload: data
})
    
export const menuActionSuccess = (data) => ({
  type: orgMenuTab.MENU_ACTION_SUCCESS,
  payload: data
})
    
export const menuActionFailure = (data) => ({
  type: orgMenuTab.MENU_ACTION_FAILURE, 
  payload: data
})

export const removeMenuToast = () => ({
  type: orgMenuTab.REMOVE_MENU_TOAST
})

