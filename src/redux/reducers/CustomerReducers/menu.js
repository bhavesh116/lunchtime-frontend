import { CustomerActions } from '../../actionTypes'

const { menuTab } = CustomerActions

const initialState = {
  menus: [],
  menuLoader: false,
  menuText:"",
  success: false,
  failure: false,
  refreshF: false,
  placeOrderSuccess: false,
  placeOrderLoader: false,
  loaderId: ''
}

const menuTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case menuTab.GET_MENU_INITIATE :
        return { ...state, menuLoader: true, success: false, failure: false}

      case menuTab.GET_MENU_SUCCESS :
        return { ...state, menuLoader: false, menus: payload.reverse() , refreshF: !state.refreshF }

      case menuTab.GET_MENU_FAILURE :
        return { ...state, menuLoader: false, menuText: payload, refreshF: !state.refreshF}  

      case menuTab.PLACE_ORDER_INITIATE :
        return { ...state, placeOrderLoader: true, loaderId: payload.dishId }
    
      case menuTab.PLACE_ORDER_SUCCESS :
        return { ...state,  placeOrderLoader: false, menuText: payload, success: true}
    
      case menuTab.PLACE_ORDER_FAILURE :
        return { ...state,  placeOrderLoader: false, menuText: payload, failure: true} 
        
      case menuTab.MENU_TOASTER_REMOVE :
        return { ...state,  menuText: '', success: false, failure: false, loaderId:'' } 
  
       default:
        return { ...state }
    }
}

export default menuTabReducer;