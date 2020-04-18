import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
    getOrgMenusSuccess,
    getOrgMenusFailure,
    createNewMenuSuccess,
    createNewMenuFailure,
    menuActionSuccess,
    menuActionFailure
} from '../../actions/OrganizationActions/orgMenu'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getOrgMenusSaga() {
    try { 
       const res = yield axios.put(`${devUrl}/organization/orgDishes`)
       yield put(getOrgMenusSuccess(res.data.data))
     } catch (err) { 
       yield put(getOrgMenusFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* createNewMenuSaga({ payload }) {
      try {
        yield axios.post(`${devUrl}/organization/createDish`, payload)
        yield put(createNewMenuSuccess('Menu created'))
      } catch (err) {
        yield put(createNewMenuFailure(err.response.data.error.message || "Something went wrong"))
      }
}

export function* menuActionSaga({ payload }) {
  try {
    yield axios.put(`${devUrl}/organization/orderStatus`, payload)
    yield put(menuActionSuccess(payload.status === 'Completed' ? 'Order placed' : 'Order cancelled'))
  } catch (err) {
    yield put(menuActionFailure(err.response.data.error.message || "Something went wrong"))
  }
}


