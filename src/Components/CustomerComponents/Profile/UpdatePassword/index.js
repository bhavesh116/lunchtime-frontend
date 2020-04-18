import  React, { useEffect, useState , useMemo } from 'react';
import { cloneDeep } from 'lodash'
import { View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerPasswordInitiate } from '../../../../redux/actions/CustomerActions/profile'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { AsyncStorage } from 'react-native';

import styled, {css} from 'styled-components/native'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 display: flex;
 padding-top: 15px;
 flex-direction: column;
 align-items: center;
 background-color: white;
`

const StyledInput = styled.TextInput`
  width:90%;
  height: 42px;
  padding-left:8px;
  display:flex;
  background-color: white;
  align-items: center;
  margin-bottom:10px;
  border-width: 1px;
  border-color: #f5ce00;
  border-radius: 5px;

  ${({required}) => required && css`
  border-color: red;
 `}
`

const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color}
 `}
`
const InputWrap = styled.View`
 display: flex;
 flex-direction: row;
 right: 5px;
 align-items: center;
`

const BigSave = styled.TouchableOpacity`
 height: 50px;
 display: flex;
 background-color: #f5ce00;
 align-items: center;
 justify-content: center;
 width: 100%;
 elevation: 3px;
`

const UpdatePassword = ({navigation}) => {
    const { navigate } = navigation
    const fields = ['Current password', 'New password']

    const initialState = {
        secureEntries: [],
        required: []
    }
    const [ state, updateState ] = useState(initialState)
    const profileState = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const {
      updatePasswordSuccess
    } = profileState

    useEffect(() => {
        if(updatePasswordSuccess) {
          Keyboard.dismiss()
          navigate('MainProfile') 
        }   
    }, [updatePasswordSuccess])

    const handleChange = (value, path) => {
        const upStat = cloneDeep(state)
        upStat[path] = value
        updateState({
            ...upStat
        })
      }

      const secureEntry = (key) => {
        let upStat = cloneDeep(state)   
        let entries = upStat.secureEntries
        if (upStat.secureEntries.includes(key)) {
            entries = upStat.secureEntries.filter(ent => ent !== key)
         } else {
            entries.push(key)
         }
         upStat.secureEntries = entries
         updateState({
             ...upStat
         }) 
      }   

      const updatePassword = () => {
        let required = []
        let upStat = cloneDeep(state)
        fields.map(itm => {
          if(!state[itm] || state[itm].length === 0) {
            required.push(itm)
          }
        })
        upStat.required = required
        updateState({
         ...upStat
        })
        if(required.length === 0) {
          let obj = {}
          obj.currentPassword = state['Current password']
          obj.updatedPassword = state['New password']
          dispatch(updateCustomerPasswordInitiate(obj))
        }
      }
    
    return (
        <Wrapper>
            {
            fields.map(itm => {
            return(
                <InputWrap>
                <StyledInput
                    placeholder={itm}
                    value={state[itm]}
                    key={itm}
                    secureTextEntry={!state.secureEntries.includes(itm)}
                    required={state.required.includes(itm)}
                    onChangeText={(text) => handleChange(text,itm)}
                />
                <View style={{top: 13, right: 8, position: "absolute"}}>
                <FontAwesomeIcon 
                  onPress={() => secureEntry(itm)} icon="eye-slash" size={17} color='grey'/>
                </View>
                </InputWrap>
                )
            })
            }
            <BigSave onPress = {() => updatePassword()}>
                <StyledText size={18} color="white">
                    Update password
                </StyledText>
            </BigSave>
        </Wrapper>
    )
}

export default UpdatePassword