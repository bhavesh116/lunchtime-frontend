import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { userLoginSaga, createCustomerSaga, createOrganizationSaga} from './auth'

const { 
    CustomerActions: { 
        organizationsTab,
        menuTab,
        orderstab,
        profileTab
    },
    OrganizationActions: { 
        customersTab,
        orgMenuTab,
        orgProfileTab
    }
} = actionTypes

import {
    getOrganizationsSaga,
    getOrganizationSaga,
    sendUnsendRequestSaga,
    disconnectFromOrgSaga
} from './CustomerSagas/organizationsSaga'

import { getMenuSaga, placeOrderSaga } from './CustomerSagas/menuSaga'

import { getOrdersSaga, cancelOrderSaga } from './CustomerSagas/ordersSaga'

import { 
   getCustomerProfileSaga,
   updateCustomerProfileSaga,
   updateCustomerPasswordSaga,
   updateCustomerFavouritesSaga,
} from './CustomerSagas/profileSaga'


import {
    getCustomersSaga,
    getRequestsSaga,
    acceptRejectCustomerSaga,
    removeCustomerSaga
} from './OrganizationSagas/customersSaga'

import {
    getOrgMenusSaga,
    createNewMenuSaga,
    menuActionSaga
} from './OrganizationSagas/menuSaga'

import {
    getOrganizationProfileSaga,
    updateOrganizationProfileSaga,
    updateOrganizationPasswordSaga
} from './OrganizationSagas/orgProfileSaga'

export default function* watcherSaga() {
 //yield customerSagas()
 //yield organizationsSagas()

 //auth sagas
 yield takeLatest(actionTypes.Auth.USER_LOGIN_INITIATE , userLoginSaga);
 yield takeLatest(actionTypes.Auth.CREATE_CUSTOMER_INITIATE , createCustomerSaga);
 yield takeLatest(actionTypes.Auth.CREATE_ORGANIZATION_INITIATE , createOrganizationSaga);

 //customer sagas
 yield takeLatest(organizationsTab.GET_ORGANIZTIONS_INITIATE , getOrganizationsSaga);
 yield takeLatest(organizationsTab.SEARCH_ORGANIZTION_INITIATE , getOrganizationSaga);
 yield takeLatest(organizationsTab.SEND_UNSEND_REQUEST_INITIATE , sendUnsendRequestSaga);
 yield takeLatest(organizationsTab.DISCONNECT_FROM_ORG_INITIATE , disconnectFromOrgSaga);
 yield takeLatest(menuTab.GET_MENU_INITIATE , getMenuSaga);
 yield takeLatest(menuTab.PLACE_ORDER_INITIATE , placeOrderSaga);
 yield takeLatest(orderstab.GET_ALL_ORDERS_INITIATE , getOrdersSaga);
 yield takeLatest(orderstab.CANCEL_ORDER_INITIATE , cancelOrderSaga);
 yield takeLatest(profileTab.GET_CUSTOMER_PROFILE_INITIATE , getCustomerProfileSaga);
 yield takeLatest(profileTab.UPDATE_CUSTOMER_PROFILE_INITIATE , updateCustomerProfileSaga);
 yield takeLatest(profileTab.UPDATE_CUSTOMER_FAVOURITES_INITIATE , updateCustomerFavouritesSaga);
 yield takeLatest(profileTab.UPDATE_CUSTOMER_PASSWORD_INITIATE , updateCustomerPasswordSaga);

 //organization sagas
 yield takeLatest(customersTab.GET_CUSTOMERS_INITIATE , getCustomersSaga);
 yield takeLatest(customersTab.GET_REQUESTS_INITIATE , getRequestsSaga);
 yield takeLatest(customersTab.REMOVE_CUSTOMER_INITIATE , removeCustomerSaga);
 yield takeLatest(customersTab.ACCEPT_REJECT_CUSTOMER_INITIATE , acceptRejectCustomerSaga);
 yield takeLatest(orgMenuTab.GET_ORG_MENUS_INITIATE , getOrgMenusSaga);
 yield takeLatest(orgMenuTab.CREATE_NEW_MENU_INITIATE , createNewMenuSaga);
 yield takeLatest(orgMenuTab.MENU_ACTION_INITIATE , menuActionSaga);
 yield takeLatest(orgProfileTab.GET_ORGANIZATION_PROFILE_INITIATE , getOrganizationProfileSaga);
 yield takeLatest(orgProfileTab.UPDATE_ORGANIZATION_PROFILE_INITIATE , updateOrganizationProfileSaga);
 yield takeLatest(orgProfileTab.UPDATE_ORGANIZATION_PASSWORD_INITIATE , updateOrganizationPasswordSaga);
}