import React from 'react'
import Toaster, { ToastStyles } from 'react-native-toaster'

const Toasters = ({message, type}) => {
  console.log('type', type)
  return (
        <Toaster 
          message={{ 
            text: message , 
            styles: ToastStyles[type]
            }}
        />
  )
}

export default Toasters;