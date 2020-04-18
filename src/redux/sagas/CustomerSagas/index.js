import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes'
const { CustomerActions: { organizationsTab, menuTab, orderstab, profileTab } } = actionTypes
import {
         getOrganizationsSaga,
         getOrganizationSaga,
         sendUnsendRequestSaga,
         disconnectFromOrgSaga
} from './organizationsSaga'
import { getMenuSaga, placeOrderSaga } from './menuSaga'
import { getOrdersSaga, cancelOrderSaga } from './ordersSaga'
import { 
        getCustomerProfileSaga,
        updateCustomerProfileSaga,
        updateCustomerPasswordSaga,
        updateCustomerFavouritesSaga,
} from './profileSaga'

export default function* customerWatcherSaga() {
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
}
