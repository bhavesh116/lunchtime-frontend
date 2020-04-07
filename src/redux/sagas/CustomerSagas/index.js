import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes'
const { CustomerActions: { organizationsTab, menuTab, orderstab } } = actionTypes
import {
         getOrganizationsSaga,
         getOrganizationSaga,
         sendUnsendRequestSaga,
         disconnectFromOrgSaga
} from './organizationsSaga'
import { getMenuSaga, placeOrderSaga } from './menuSaga'
import { getOrdersSaga, cancelOrderSaga } from './ordersSaga'

export default function* customerWatcherSaga() {
 yield takeLatest(organizationsTab.GET_ORGANIZTIONS_INITIATE , getOrganizationsSaga);
 yield takeLatest(organizationsTab.SEARCH_ORGANIZTION_INITIATE , getOrganizationSaga);
 yield takeLatest(organizationsTab.SEND_UNSEND_REQUEST_INITIATE , sendUnsendRequestSaga);
 yield takeLatest(organizationsTab.DISCONNECT_FROM_ORG_INITIATE , disconnectFromOrgSaga);
 yield takeLatest(menuTab.GET_MENU_INITIATE , getMenuSaga);
 yield takeLatest(menuTab.PLACE_ORDER_INITIATE , placeOrderSaga);
 yield takeLatest(orderstab.GET_ALL_ORDERS_INITIATE , getOrdersSaga);
 yield takeLatest(orderstab.CANCEL_ORDER_INITIATE , cancelOrderSaga);
}
