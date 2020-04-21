// import { takeLatest } from 'redux-saga/effects';
// import * as actionTypes from '../../actionTypes';

// const { OrganizationActions: { customersTab, menuTab, orgProfileTab } } = actionTypes

// import {
//     getCustomersSaga,
//     getRequestsSaga,
//     acceptRejectCustomerSaga,
//     removeCustomerSaga
// } from './customersSaga'

// import {
//     getOrgMenusSaga,
//     createNewMenuSaga,
//     menuActionSaga
// } from './menuSaga'

// import {
//     getOrganizationProfileSaga,
//     updateOrganizationProfileSaga,
//     updateOrganizationPasswordSaga
// } from './orgProfileSaga'

// export default function* organizationWatcherSaga() {
//     yield takeLatest(customersTab.GET_CUSTOMERS_INITIATE , getCustomersSaga);
//     yield takeLatest(customersTab.GET_REQUESTS_INITIATE , getRequestsSaga);
//     yield takeLatest(customersTab.REMOVE_CUSTOMER_INITIATE , removeCustomerSaga);
//     yield takeLatest(customersTab.ACCEPT_REJECT_CUSTOMER_INITIATE , acceptRejectCustomerSaga);
//     yield takeLatest(menuTab.GET_ORG_MENUS_INITIATE , getOrgMenusSaga);
//     yield takeLatest(menuTab.CREATE_NEW_MENU_INITIATE , createNewMenuSaga);
//     yield takeLatest(menuTab.MENU_ACTION_INITIATE , menuActionSaga);
//     yield takeLatest(orgProfileTab.GET_ORGANIZATION_PROFILE_INITIATE , getOrganizationProfileSaga);
//     yield takeLatest(orgProfileTab.UPDATE_ORGANIZATION_PROFILE_INITIATE , updateOrganizationProfileSaga);
//     yield takeLatest(orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_INITIATE , updateOrganizationPasswordSaga);
// }