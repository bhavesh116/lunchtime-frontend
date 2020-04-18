import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
    getOrganizationsSuccess,
    getOrganizationsFailure,
    searchOrganizationSuccess,
    searchOrganizationFailure,
    sendUnsendRequestSuccess,
    sendUnsendRequestFailure,
    disconnectFromOrgSuccess,
    disconnectFromOrgFailure
} from '../../actions/CustomerActions/organizations'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getOrganizationsSaga() {
    try {
       const res = yield axios.put(`${devUrl}/customer/organizations`)
       yield put(getOrganizationsSuccess(res.data.data))
     } catch (err) {
       yield put(getOrganizationsFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* getOrganizationSaga({ payload }) {
      try {
        const res = yield axios.put(`${devUrl}/customer/findOrgByName`, payload)
        yield put(searchOrganizationSuccess(res.data.data))
      } catch (err) {
        yield put(searchOrganizationFailure(err.response.data.error.message || "Something went wrong"))
      }
}

export function* sendUnsendRequestSaga({ payload }) {
    try {
       yield axios.put(`${devUrl}/customer/orgConnection`, payload)
       yield put(sendUnsendRequestSuccess(payload.action === 'send' ? 'request sent' : 'request removed'))
     } catch (err) {
       yield put(sendUnsendRequestFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* disconnectFromOrgSaga({ payload }) {
  console.log('payload', payload)
    try {
       yield axios.delete(`${devUrl}/customer/disconnectToOrg`, {data:payload})
       yield put(disconnectFromOrgSuccess("removed from org successfully"))
     } catch (err) {
       yield put(disconnectFromOrgFailure(err.response.data.error.message || "Something went wrong"))
     }
}

