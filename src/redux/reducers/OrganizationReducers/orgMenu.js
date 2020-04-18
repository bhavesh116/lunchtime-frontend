import { OrganizationActions } from '../../actionTypes'

const { menuTab } = OrganizationActions

const initialState = {
  menus: [],
  menuLoader: false,
  tabText: "",
  refreshF: false,
  createMenuLoader: false,
  menuActionLoader: false,
  acceptRejectLoader: false
}

const organizationTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case menuTab.GET_ORG_MENUS_INITIATE :
        return { ...state, menuLoader: true }

      case menuTab.GET_ORG_MENUS_SUCCESS :
        return { ...state, menuLoader: false, menus: payload, refreshF: !state.refreshF }

      case menuTab.GET_ORG_MENUS_FAILURE :
        return { ...state, menuLoader: false, tabText: payload, refreshF: !state.refreshF }  

      case menuTab.CREATE_NEW_MENU_INITIATE :
        return { ...state, createMenuLoader: true }
    
      case menuTab.CREATE_NEW_MENU_SUCCESS :
        return { ...state, createMenuLoader: false, tabText: payload }
    
      case menuTab.CREATE_NEW_MENU_FAILURE :
        return { ...state, createMenuLoader: false, tabText: payload }

      case menuTab.MENU_ACTION_INITIATE :
        return { ...state, menuActionLoader: true }
        
      case menuTab.MENU_ACTION_SUCCESS :
        return { ...state, menuActionLoader: false , tabText: payload }

      case menuTab.MENU_ACTION_FAILURE :
        return { ...state, menuActionLoader: false , tabText: payload }

       case menuTab.REMOVE_MENU_TOAST :
         return { ...state, tabText: "" }    
  
       default:
        return { ...state }
    }
}

export default organizationTabReducer;