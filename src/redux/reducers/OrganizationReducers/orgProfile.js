import { OrganizationActions } from '../../actionTypes'

const { orgProfileTab } = OrganizationActions

const initialState = {
 orgProfile: {},
 orgProfileLoader: false,
 tabText: '',
 updateOrgLoader: false,
 updatePasswordLoader: false,
 refreshF: false,
}

const orgProfileTabReducer = ( state = initialState, { type, payload } ) => {
    switch(type) {
      case orgProfileTab.GET_ORGANIZATION_PROFILE_INITIATE :
        return { ...state, orgProfileLoader: true }

      case orgProfileTab.GET_ORGANIZATION_PROFILE_SUCCESS :
        return { ...state, orgProfileLoader: false, orgProfile: payload, refreshF: !state.refreshF }

      case orgProfileTab.GET_ORGANIZATION_PROFILE_FAILURE :
        return { ...state, orgProfileLoader: false, tabText: payload, refreshF: !state.refreshF }  

      case orgProfileTab.UPDATE_ORGANIZATION_PROFILE_INITIATE :
        return { ...state, updateOrgLoader: true }
    
      case orgProfileTab.UPDATE_ORGANIZATION_PROFILE_SUCCESS :
        return { ...state, updateOrgLoader: false, tabText: payload,}
    
      case orgProfileTab.UPDATE_ORGANIZATION_PROFILE_FAILURE :
        return { ...state, updateOrgLoader: false, tabText: payload, }
        
      case orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_INITIATE :
          return { ...state, updatePasswordLoader: true }
          
      case orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_SUCCESS :
          return { ...state, updatePasswordLoader: false, tabText: payload, }
          
      case orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_FAILURE :
          return { ...state, updatePasswordLoader: false, tabText: payload }
          
      case orgProfileTab.REMOVE_ORG_PROFILE_TOAST :
          return { ...state, tabText: '' }    
  
       default:
        return { ...state }
    }
}

export default orgProfileTabReducer;