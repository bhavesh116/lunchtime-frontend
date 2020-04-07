import { CustomerActions } from '../../actionTypes'

const { orderstab } = CustomerActions 

export const getAllOrdersInitiate = (data) => ({
 type: orderstab.GET_ALL_ORDERS_INITIATE,
 payload: data
})

export const getAllOrdersSuccess = (data) => ({
 type: orderstab.GET_ALL_ORDERS_SUCCESS,
 payload: data
})

export const getAllOrdersFailure = (data) => ({
 type: orderstab.GET_ALL_ORDERS_FAILURE,
 payload: data
})

export const cancelOrderInitiate = (data) => ({
 type: orderstab.CANCEL_ORDER_INITIATE,
 payload: data
})

export const cancelOrderSuccess = (data) => ({
 type: orderstab.CANCEL_ORDER_SUCCESS,
 payload: data
})

export const cancelOrderFailure = (data) => ({
 type: orderstab.CANCEL_ORDER_FAILURE,
 payload: data
})

export const orderToasterRemove = (data) => ({
 type: orderstab.ORDER_TOASTER_REMOVE,
 payload: data
})