import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { 
         getMenuSuccess,
         getMenuFailure,
         placeOrderSuccess,
         placeOrderFailure
} from '../../actions/CustomerActions/menu'

const { devUrl } = config

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getMenuSaga() {
    try {
       const res = yield axios.put(`${devUrl}/customer/dishes`)
       yield put(getMenuSuccess(res.data.data))
     } catch (err) {
       yield put(getMenuFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* placeOrderSaga({ payload }) {
      try {
        yield axios.put( `${devUrl}/customer/acceptUnAcceptDish`, payload)
        yield put(placeOrderSuccess("Order placed successfully"))
      } catch (err) {
        yield put(placeOrderFailure(err.response.data.error.message || "Something went wrong"))
      }
}