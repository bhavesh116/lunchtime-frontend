import  React, { useEffect, useReducer } from 'react';
import { cloneDeep } from 'lodash'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { updateCustomerProfileInitiate } from '../../../../redux/actions/CustomerActions/profile'
import { useDispatch, useSelector } from 'react-redux';
import { enhancedReducer } from '../../../Common/utilities'
import styled, {css} from 'styled-components/native'
import Loader from '../../../Common/Loader';

const MainWrapper = styled.View`
 height: 100%;
 width: 100%;
`

const Header = styled.View`
 height: 50px;
 width: 100%;
 border-bottom-color: #f1f1f1;
 border-bottom-width: 1px;
 padding: 0px 10px;
 display: flex;
 justify-content: space-between;
 flex-direction: row;
 align-items: center;

 ${({bebe}) => bebe && css`
  margin-bottom: 10px;
 `}
`

const AvatarWrap = styled.View`
 margin: 10px 0px;
 height: 230px;
 width: 100%;
 background-color: white;
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

const AvatarContents = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const Avatar = styled.Image`
 height: 75px;
 width: 75px;
`

const ImageWrap = styled.TouchableOpacity`
 padding: 5px;
 border-right-color: #f1f1f1;
 border-right-width: 1px;
 border-bottom-color: #f1f1f1;
 border-bottom-width: 1px;
 ${({noBorder}) => noBorder && css`
  border-right-width: 0px;
 `}
 ${({active}) => active && css`
  background-color: orange;
 `}
`

const EditProfileWrap = styled.View`
 display: flex;
 flex-direction: column;
 align-items: center;
 height: 230px;
 background-color: white;
`

const StyledInput = styled.TextInput`
  width:70%;
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

const BigSave = styled.TouchableOpacity`
 height: 50px;
 display: flex;
 background-color: #f5ce00;
 align-items: center;
 justify-content: center;
 width: 100%;
 elevation: 3px;
`

const avatars = [
    "https://i.ibb.co/qmFrqTn/av8.png",
    "https://i.ibb.co/qgc8qLv/av7.png",
    "https://i.ibb.co/bHMw5xg/av6.png",
    "https://i.ibb.co/7bwDYZF/av5.png",
    "https://i.ibb.co/gVJ66HM/av4.png",
    "https://i.ibb.co/5jwSSyD/av3.png",
    "https://i.ibb.co/hL9R4dt/av2.png",
    "https://i.ibb.co/MV0240s/av1.png",
] 


const ProfileEdit = (props) => {
    const { navigation: {navigate }, route: { params } } = props
    const initialState = {
       required: [],
       fields: {}
    }
    const profileState = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const {
      profileUpdateSuccess,
      updateCustomerLoader
    } = profileState

    const [state, updateState] = useReducer(enhancedReducer, initialState)
    const fields = ['First name', 'Last name', 'Email']

    useFocusEffect(
      React.useCallback(() => {
        let upStat = cloneDeep(state.fields)
        upStat['First name'] = params.firstName
        upStat['Last name'] = params.lastName
        upStat.Email = params.email
        upStat.selectedAvatar = params.avatarUrl
        updateState({
          path: 'fields',
          value: upStat
        })
      }, []))

      useEffect(() => {
         if(profileUpdateSuccess) {
           navigate('MainProfile')
         }
      }, [profileUpdateSuccess])

    const handleChange = (value, path) => {
      const upStat = cloneDeep(state.fields)
      upStat[path] = value
        if(path === 'selectedAvatar' && state.fields[path] === value) {
          upStat.fields[path] = 'https://i.ibb.co/QD85QZK/user.png'
        }
        updateState({
          path: 'fields',
          value: upStat
        })
    }

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    const updateProfile = () => {
      let required = []
      fields.map(itm => {
        if(!state.fields[itm] || state.fields[itm].length === 0) {
          required.push(itm)
        }
        if(itm === 'Email' && !validateEmail(state.fields[itm])) {
          required.push(itm)
        }
      })
      updateState({
        path: 'required',
        value: required
      })
      if(required.length === 0) {
        let obj = {}
        obj.firstName = state.fields['First name']
        obj.lastName = state.fields['Last name']
        obj.email = state.fields.Email
        obj.avatarUrl = state.fields.selectedAvatar
        dispatch(updateCustomerProfileInitiate(obj))
      }
    }

   console.log('state is', state)
    return (
        <MainWrapper>
          <EditProfileWrap>
            <Header bebe>
            <View>
            <StyledText size={18} color="grey">
                Edit profile
            </StyledText>
            </View>
            <View>
            <StyledText onPress={() => navigate('Password')}size={14} color="#23395d">
                Change password
            </StyledText>
            </View>
            </Header>
            {
                fields.map(itm => {
                    return(
                        <StyledInput
                          placeholder={itm}
                          value={state.fields[itm]}
                          key={itm}
                          required={state.required.includes(itm)}
                          onChangeText={(text) => handleChange(text, itm)}
                        />
                    )
                })
            }
            </EditProfileWrap>
            <AvatarWrap>
                <Header>
                    <View>
                    <StyledText size={18} color="grey">
                        Select Avatar
                    </StyledText>
                    </View>
                </Header>
                <AvatarContents>
                  {
                      avatars.map((image, index) => {
                          return(
                              <ImageWrap 
                                onPress={() => handleChange(image, 'selectedAvatar')}
                                noBorder={index === 3 || index === 7}
                                active={state.fields.selectedAvatar === image}
                              >
                              <Avatar source={{uri: image}}/>
                              </ImageWrap>
                          )
                      })
                  }
                </AvatarContents>
            </AvatarWrap>
            <BigSave  onPress={() => updateProfile()} >
              {
                updateCustomerLoader ? 
                 <Loader color="white" size={12} />
                 :
                 <StyledText size={15} color="white">
                  Save
                 </StyledText>            
              }
            </BigSave>
        </MainWrapper>
    )
}

export default ProfileEdit