import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
    getCustomerProfileSuccess,
    getCustomerProfileFailure,
    updateCustomerProfileSuccess,
    updateCustomerProfileFailure,
    updateCustomerFavouritesSuccess,
    updateCustomerFavouritesFailure,
    updateCustomerPasswordSuccess,
    updateCustomerPasswordFailure,
} from '../../actions/CustomerActions/profile'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getCustomerProfileSaga() {
    try {
       const res = yield axios.put(`${devUrl}/auth/getUserProfile`)
       yield put(getCustomerProfileSuccess(res.data.data))
     } catch (err) {
       yield put(getCustomerProfileFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* updateCustomerProfileSaga({ payload }) {
      try {
        yield axios.put(`${devUrl}/customer/updateCustomer`, payload)
        yield put(updateCustomerProfileSuccess("Profile updated successfully"))
      } catch (err) {
        yield put(updateCustomerProfileFailure(err.response.data.error.message || "Something went wrong"))
      }
}

export function* updateCustomerFavouritesSaga({ payload }) {
    try {
       yield axios.put(`${devUrl}/customer/updateFavourites`, payload)
       yield put(updateCustomerFavouritesSuccess("Favourites updated successfully"))
     } catch (err) {
       yield put(updateCustomerFavouritesFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* updateCustomerPasswordSaga({ payload }) {
    try {
       yield axios.put(`${devUrl}/auth/updatePassword`, payload)
       yield put(updateCustomerPasswordSuccess("Password updated successfully"))
      } catch (err) {
       yield put(updateCustomerPasswordFailure(err.response.data.error.message || "Something went wrong"))
     }
}

