import { CustomerActions } from '../../actionTypes'

const { menuTab } = CustomerActions 

export const getMenuInitiate = (data) => ({
 type: menuTab.GET_MENU_INITIATE,
 payload: data
})

export const getMenuSuccess = (data) => ({
 type: menuTab.GET_MENU_SUCCESS,
 payload: data
})
  
export const getMenuFailure = (data) => ({
 type: menuTab.GET_MENU_FAILURE,
 payload: data
})
  
export const placeOrderInitiate = (data) => ({
 type: menuTab.PLACE_ORDER_INITIATE,
 payload: data
})

export const placeOrderSuccess = (data) => ({
 type: menuTab.PLACE_ORDER_SUCCESS,
 payload: data
})

export const placeOrderFailure = (data) => ({
 type: menuTab.PLACE_ORDER_FAILURE,
 payload: data
})

export const menuToasterRemove = () => ({
    type: menuTab.MENU_TOASTER_REMOVE
})
