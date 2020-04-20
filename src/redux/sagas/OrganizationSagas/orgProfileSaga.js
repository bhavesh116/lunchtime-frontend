import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
      getOrganizationProfileSuccess,
      getOrganizationProfileFailure,
      updateOrganizationProfileSuccess,
      updateOrganizationProfileFailure,
      updateOrganizationPasswordSuccess,
      updateOrganizationPasswordFailure
} from '../../actions/OrganizationActions/orgProfile'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getOrganizationProfileSaga() {
    try {
       const res = yield axios.put(`${devUrl}/auth/getUserProfile`)
       yield put(getOrganizationProfileSuccess(res.data.data))
     } catch (err) {
       yield put(getOrganizationProfileFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* updateOrganizationProfileSaga({ payload }) {
      try {
        yield axios.put(`${devUrl}/organization/updateOrganization`, payload)
        yield put(updateOrganizationProfileSuccess("Profile updated successfully"))
      } catch (err) {
        yield put(updateOrganizationProfileFailure(err.response.data.error.message || "Something went wrong"))
      }
}

export function* updateOrganizationPasswordSaga({ payload }) {
    try {
       yield axios.put(`${devUrl}/auth/updatePassword`, payload)
       yield put(updateOrganizationPasswordSuccess("Password updated successfully"))
      } catch (err) {
       yield put(updateOrganizationPasswordFailure(err.response.data.error.message || "Something went wrong"))
     }
}

