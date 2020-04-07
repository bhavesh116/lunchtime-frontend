import { takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actionTypes';
import { userLoginSaga, createCustomerSaga, createOrganizationSaga} from './auth'
import organizationsSagas from './OrganizationSagas'
import customerSagas from './CustomerSagas'

export default function* watcherSaga() {
 yield takeLatest(actionTypes.Auth.USER_LOGIN_INITIATE , userLoginSaga);
 yield takeLatest(actionTypes.Auth.CREATE_CUSTOMER_INITIATE , createCustomerSaga);
 yield takeLatest(actionTypes.Auth.CREATE_ORGANIZATION_INITIATE , createOrganizationSaga);
 yield organizationsSagas()
 yield customerSagas()
}