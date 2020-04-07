import React from 'react';
import {View}  from 'react-native'
import { DotsLoader } from 'react-native-indicator';

const Loader = ({size, color}) => {
    return (
        <View>
        <DotsLoader size={size ? size : 10} color={color ? color : "#f5ce00"}/>
        </View>
    )
}

export default Loader;

