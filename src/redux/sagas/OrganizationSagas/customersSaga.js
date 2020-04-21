import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
    getCustomersSuccess,
    getCustomersFailure,
    getRequestsSuccess,
    getRequestsFailure,
    removeCustomerSuccess,
    removeCustomerFailure,
    acceptRejectCustomerSuccess,
    acceptRejectCustomerFailure
} from '../../actions/OrganizationActions/orgCustomers'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getCustomersSaga() {
    try { 
       const res = yield axios.put(`${devUrl}/organization/customer`)
       console.log('res is', res)
       yield put(getCustomersSuccess(res.data.data))
     } catch (err) { 
         console.log('err is',err)
       yield put(getCustomersFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* getRequestsSaga({ payload }) {
      try {
        const res = yield axios.put(`${devUrl}/organization/requests`, payload)
        yield put(getRequestsSuccess(res.data.data))
      } catch (err) {
        yield put(getRequestsFailure(err.response.data.error.message || "Something went wrong"))
      }
}

export function* removeCustomerSaga({ payload }) {
    console.log('ppppp', payload)
    try {
       yield axios.put(`${devUrl}/organization/removeFromOrg`, payload)
       yield put(removeCustomerSuccess('customer removed from organization'))
     } catch (err) {
       yield put(removeCustomerFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* acceptRejectCustomerSaga({ payload }) {
    try {
       yield axios.put(`${devUrl}/organization/acceptRejectCustomer`, payload)
       yield put(acceptRejectCustomerSuccess(payload.action === 'accept' ? 'request ccepted' : 'request rejected'))
     } catch (err) {
       yield put(acceptRejectCustomerFailure(err.response.data.error.message || "Something went wrong"))
     }
}

