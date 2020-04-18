import { put } from 'redux-saga/effects';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../../config/config.json'
import { getAllOrdersSuccess,
         getAllOrdersFailure,
         cancelOrderSuccess,
         cancelOrderFailure       
} from '../../actions/CustomerActions/orders'

const { devUrl } = config 

AsyncStorage.getItem('userData').then(data => {
return JSON.parse(data)
}).then(userData => axios.defaults.headers.common = {'Authorization': `bearer ${userData.token}`} )

export function* getOrdersSaga() {
    try {
       const res = yield axios.put(`${devUrl}/customer/orders`)
       console.log('res is', res)
       yield put(getAllOrdersSuccess(res.data.data))
     } catch (err) {
       yield put(getAllOrdersFailure(err.response.data.error.message || "Something went wrong"))
     }
}

export function* cancelOrderSaga({ payload }) {
      try {
        yield axios.put(`${devUrl}/customer/acceptUnAcceptDish`, payload)
        yield put(cancelOrderSuccess("Order cancelled successfully"))
      } catch (err) {
        yield put(cancelOrderFailure(err.response.data.error.message || "Something went wrong"))
      }
}