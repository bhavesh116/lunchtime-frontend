import  React, { useEffect, useState , useReducer } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash'
import moment from 'moment'
import styled, {css} from 'styled-components/native'
import { createNewMenuInitiate, removeMenuToast} from '../../../../redux/actions/OrganizationActions/orgMenu'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { enhancedReducer } from '../../../Common/utilities/index'
import Loader from '../../../Common/Loader'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 background-color: white;
 display: flex;
 padding: 20px;
 flex-direction: column;
`

const StyledInput = styled.TextInput`
  width:90%;
  height: 42px;
  padding-left:8px;
  margin-top: 5px;
  background-color: white;
  margin-bottom:10px;
  border-width: 1px;
  border-color: #f5ce00;
  border-radius: 5px;
  &:last-child {
    margin-bottom: 20px;
  }

  ${({required}) => required && css`
   border-color: red;
  `}
  `
const InputView = styled.View`
 display: flex;
 flex-direction: column;
`
const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color}
 `}
`
const ButtonView = styled.View`
 display: flex;
 margin-top: 20px;
 flex-direction: row;
 justify-content: flex-end;
 width:90%;
`

const TimeButton = styled.TouchableOpacity`
 height: 42px;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 90%;
 border-radius: 5px;
 margin-top: 5px;
 border-color: #f5ce00;
 border-width: 1px
`

const CreateButton = styled.TouchableOpacity`
 height: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
 width: 130px;
 border-radius: 5px;
 background-color: #f5ce00;
`

const CreateMenu = ({navigation}) => {
    const initialState = {
        required: [],
        inputs: {},
        serveTime: moment().valueOf(),
        showTimer: false
    }
   const { navigate } = navigation 
   const dispatch = useDispatch()
   const [state, updateState] = useReducer(enhancedReducer, initialState)
   const fields = ['Name', 'Price (Rs)', 'Serve time']
   const menuState = useSelector(state => state.orgMenu)

   const {
    createMenuLoader,
    tabText
   } = menuState

   useEffect(() => {
    if(tabText.length > 0) {
        ToastAndroid.showWithGravity(
            tabText,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
       )
       dispatch(removeMenuToast())
       navigate('OrgMenu')
    }
   }, [tabText])

   const handleChange = (item, value) => {
     let upStat = cloneDeep(state.inputs)
     upStat[item] = value
     updateState({
         path: 'inputs',
         value: upStat
     })
   }

   const handleConfirm = date => {
    const time = date.toString().slice(16, 24)
    const momentTime = moment(time, 'hh:mm:ss').valueOf()
    updateState({
      path: 'showTimer',
      value: false
    })
    updateState({
        path: 'serveTime',
        value: momentTime
    })
  };

  const createMenu = () => {
     const req = []
     fields.length = 2
     fields.map(itm => {
         if(!state.inputs[itm]) {
             req.push(itm)
         }
     })
     updateState({
         path: 'required',
         value: req
     })
     if(req.length === 0) {
         let obj ={}
         obj.dishName = state.inputs.Name
         obj.price = state.inputs['Price (Rs)']
         obj.serveTime = state.serveTime
         dispatch(createNewMenuInitiate(obj))
     }
  }

  console.log('state is', state)

   return (
       <Wrapper>
         {
             fields.map(itm => {
                 return (
                     <InputView>
                     <StyledText size={16} color="grey">{itm} </StyledText>
                      {
                          itm === 'Serve time' ? 
                          <TimeButton onPress={() => {
                            updateState({
                                path: 'showTimer',
                                value: true
                            })
                          }} >
                          <StyledText size={16}>
                              {
                                 moment(state.serveTime).format('hh:mm:A')
                              }
                          </StyledText>
                          </TimeButton> 
                          :
                          <StyledInput
                            value={state.inputs[itm]}
                            key={itm}
                            keyboardType={itm === 'Name' ? 'default' : 'numeric'}
                            required={state.required.includes(itm)}
                            onChangeText={(text) => handleChange(itm, text)}
                         />
                      }
                     </InputView>
                 )
             })
         }
         <ButtonView>
             <CreateButton onPress={createMenu}>
                 {
                !createMenuLoader ?
                 <StyledText size={16} color="white">
                     Create menu
                 </StyledText>
                 : 
                 <Loader color="white" size={14} />
                 }
             </CreateButton>
         </ButtonView>
         <DateTimePickerModal
            isVisible={state.showTimer}
            mode="time"
            date={state.serveTime}
            onConfirm={(time) => handleConfirm(time)}
            onCancel={() => {
                updateState({
                    path: 'showTimer',
                    value: false
                })
              }}
         />
       </Wrapper>
   )
}

export default CreateMenu