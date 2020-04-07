import React from 'react'
import {Image , StyleSheet} from 'react-native'
import av1 from '../../../static/av1.png'
import av2 from '../../../static/av2.png'
import av3 from '../../../static/av3.png'
import av4 from '../../../static/av4.png'
import av5 from '../../../static/av5.png'
import av6 from '../../../static/av6.png'
import av7 from '../../../static/av7.png'
import av8 from '../../../static/av8.png'
import user from '../../../static/user.png'


const ReturnImage = (name, style) => {
 const returnImg = (name) => {
     switch (name) {
           case 'av1':
            return av1
           case 'av2':
            return av2
           case 'av3':
            return av3
           case 'av4':
            return av4
           case 'av5':
            return av5
           case 'av6':
            return av6
           case 'av7':
            return av7
           case 'av8':
            return av8
           default: 
            return user
     }
 } 

 return(
  <Image
    style={styles[style]}
    source={() => returnImg(name)}
  />
 )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

  export default ReturnImage