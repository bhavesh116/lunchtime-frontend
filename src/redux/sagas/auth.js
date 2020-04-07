import { put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import axios from 'axios'
import { userLoginSuccess,
         userLoginError,
         createCustomerSuccess,
         createCustomerError, 
         createOrganizationSuccess,
         createOrganizationError
     } from '../actions/auth'

export function* userLoginSaga({ payload }) {
    try {
       const res = yield axios.post('http://192.168.1.2:3000/auth/login', payload)
       const {
         userId,
         token,
         userType    
       } = res.data
       yield AsyncStorage.setItem('userData', JSON.stringify({userId, userType, token}))
       yield put(userLoginSuccess({userId, userType, token}))
     } catch (err) {
       yield put(userLoginError(err.response.data.error.message || "Something went wrong"))
     }
}

export function* createCustomerSaga({ payload }) {
      try {
        yield axios.put('http://192.168.1.2:3000/auth/signUp', payload)
        yield put(createCustomerSuccess("User created successfully"))
      } catch (err) {
        yield put(createCustomerError(err.response.data.error.message || "Something went wrong"))
      }
}

export function* createOrganizationSaga({ payload }) {
    try {
       yield axios.put('http://192.168.1.2:3000/auth/orgSignUp', payload)
       yield put(createOrganizationSuccess("Organization created successfully"))
     } catch (err) {
       yield put(createOrganizationError(err.response.data.error.message || "Something went wrong"))
     }
}
