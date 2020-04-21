

import { CustomerActions } from '../../actionTypes'

const { orderstab } = CustomerActions

const initialState = {
  orders: [],
  ordersLoader: false,
  orderText:"",
  refreshF: false,
  success: false,
  failure: false,
  cancelOrderLoader: false,
  loaderId: ''
}

const orderTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case orderstab.GET_ALL_ORDERS_INITIATE :
        return { ...state, ordersLoader: true , success: false, failure: false }

      case orderstab.GET_ALL_ORDERS_SUCCESS :
        return { ...state, ordersLoader: false, orders: payload.reverse(), refreshF: !state.refreshF }

      case orderstab.GET_ALL_ORDERS_FAILURE :
        return { ...state, ordersLoader: false, orderText: payload, refreshF: !state.refreshF }  

      case orderstab.CANCEL_ORDER_INITIATE :
        return { ...state, cancelOrderLoader: true, loaderId: payload.dishId }
    
      case orderstab.CANCEL_ORDER_SUCCESS : 
        return { ...state,  cancelOrderLoader: false, orderText: payload, success: true}
    
      case orderstab.CANCEL_ORDER_FAILURE :
        return { ...state,  cancelOrderLoader: false, orderText: payload, failure: true} 
        
      case orderstab.ORDER_TOASTER_REMOVE :
        return { ...state,  orderText: '', success: false, failure: false, loaderId:'' } 
  
       default:
        return { ...state }
    }
}

export default orderTabReducer;