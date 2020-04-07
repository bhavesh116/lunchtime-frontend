import { combineReducers } from 'redux';
import auth from './auth'

//combined organization and customer reducers
import organizationReducers from './OrganizationReducers/index'
import customerReducers from './CustomerReducers/index'

export default combineReducers({
 auth,
 ...organizationReducers,
 ...customerReducers
});
