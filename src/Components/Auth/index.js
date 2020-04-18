import React, {useReducer, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  View
} from 'react-native';
import {cloneDeep} from 'lodash'
import styled, {css} from 'styled-components/native'
import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter } from 'react-native-modals';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Loader from '../Common/Loader'
import { enhancedReducer } from '../Common/utilities/index'
import {clearAuthState,  userLoginInitiate, createCustomerInitiate, createOrganizationInitiate, removeAuthToaster } from '../../redux/actions/auth';
import Toaster from '../Common/Toaster'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 background-color: gold;
 display: flex;
 justify-content: center;
 align-items: center;
`
const InputWrap = styled.View`
 display: flex;
 flex-direction: row;
 right: 5px;
 align-items: center;
`
const StyledInput = styled.TextInput`
  width:70%;
  margin-left: 20px;
  height: 42px;
  padding-left:8px;
  display:flex;
  background-color: white;
  align-items: center;
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

  ${({signUp})=> signUp && css`
   width: 88%;
  `}
`
const StyledText = styled.Text`
 color: ${({color}) => color};
 font-size:${({size}) => size}px;
 font-weight: ${({weight}) => weight}
`
const LoginButton = styled.TouchableOpacity`
 display: flex;
 width: 70%;
 height: 42px;
 margin: 10px 0px 0px 30px
 padding: 0px 10px;
 border-radius: 5px;
 background-color: #f5ce00;
 justify-content: center;
 align-items: center;
`
const ModalView = styled.View`
 display: flex;
 flex-direction: column;
`
const ModalTopBar = styled.View`
 height: 60px;
 width: 100%;
 display: flex;
 flex-direction: row;
 border-bottom-color: #f1f1f1;
 border-bottom-width: 1px;
 margin-bottom: 10px;
 `
 const ModalTopContent = styled.TouchableOpacity`
 height: 100%;
 width: 50%;
 display: flex;
 align-items: center;
 justify-content: center;

 ${({border}) => border && css`
  border-right-color: #f1f1f1;
  border-right-width: 1px;
`}

${({active}) => active && css`
  border-bottom-color: #f5ce00;
  border-bottom-width: 3px;
`}
 `
 const SignUpContent = styled.View`
 display: flex;
 flex-direction: column;
 `

 const NoAccount = styled.View`
  display: flex;
  flex-direction: row;
  left: 35px;
  margin-top: 30px
 `

 const Footer = styled.View`
  display: flex;
  flex-direction: row;
  height: 55px;
 `
 const FooterButtton = styled.TouchableOpacity`
  width: 50%
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({border}) => border && css`
  border-right-color: #f1f1f1;
  border-right-width: 1px;
  `}
 `
 
 const LoaderView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%; 
  ${({login}) => login && css`
  width: 100%; 
  `}
`

const Auth = (props) => {
  const { navigation:{ navigate } } = props

  const dispatch = useDispatch()
  const authState = useSelector(state => state.auth)

  const {
    signUpLoader,
    authSuccess,
    authFailure,
    loginLoader,
    loginSuccess,
    authText,
    userType
  } = authState

  const initialState = {
    secureEntries: [],
    required: [],
    loginCredentials: {},
    signUpCredentials: {},
    signUpType: 'User',
    modalVisible: false,
    switchValue: false
  }

  const [state, updateState] = useReducer(enhancedReducer, initialState)

  const fields = {
    modalTop: ['User','Organization'],
    inputs: [
      {key:"emailLogin",name:"Email", icon: 'at'},
      {key:"passwordLogin", name:"Password", icon: 'key'}
    ],
    signUp:{
     Organization:[
       {key:"orgSignUpName",name:"Organization name"},
       {key:"orgSignUpEmail",name:"Email"},
       {key:"orgSignUpPassword",name:"Password"}
      ], 
     User:[
       {key:"customerFirstName",name:"First name"},
       {key:"customerLastName",name:"Last name"},
       {key:"customerSignUpEmail",name:"Email"},
       {key:"customerSignUpPassword",name:"Password"}
      ]
    },
    modalFooter:['Cancel', 'Sign Up']
  }

  const modalShow = (value) =>{
    updateState({
      path: 'modalVisible',
      value: value
    })
  }

  useEffect(() => {
    if(loginSuccess && userType) {
       if(userType === 'customer') {
         console.log('hey')
         return navigate('CustomerRoutes')
       }
       if(userType === 'organization') {
         return navigate('OrganizationRoutes')
      }
      dispatch(clearAuthState())  
    }
  },[loginSuccess])

  useEffect(() => {
    if(authSuccess) {
      let vals = {}
      if(state.signUpType === 'User') {
        vals['emailLogin'] = state.signUpCredentials.customerSignUpEmail
        vals['passwordLogin'] = state.signUpCredentials.customerSignUpPassword
      }
      if(state.signUpType === 'Organization') {
        vals['emailLogin'] = state.signUpCredentials.orgSignUpEmail
        vals['passwordLogin'] = state.signUpCredentials.orgSignUpPassword
      }
      updateState({
        path: 'loginCredentials',
        value: vals
      })
    }
    updateState({
      path: 'signUpCredentials',
      value: {}
    })
    updateState({
      path: 'required',
      value: []
    })
    setTimeout(() =>dispatch(removeAuthToaster()), 3000)    
    modalShow(false)
   }, [authSuccess, authFailure])

  const signUpMap = () => {
    if(state.signUpType === 'Organization') {
      return fields.signUp.Organization
    }
    return fields.signUp.User
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submitSignUp = () => {
    let type = state.signUpType
    const errors = []
    fields.signUp[type].map(itm => {
      if (!state.signUpCredentials[itm.key] || state.signUpCredentials[itm.key].length === 0) {
        errors.push(itm.key)
      }
      if(itm.name === 'Email' && !validateEmail(state.signUpCredentials[itm.key])) {
        errors.push(itm.key)
      }
    })
    updateState({
      path: 'required',
      value: errors
    })
    if (errors.length === 0) {
      if(type === 'Organization') {
        let data = {
          orgName: state.signUpCredentials.orgSignUpName,
          email: state.signUpCredentials.orgSignUpEmail,
          password: state.signUpCredentials.orgSignUpPassword
        }
         dispatch(createOrganizationInitiate(data))
      }
      if(type === 'User') {
        let data = {
          firstName: state.signUpCredentials.customerFirstName,
          lastName: state.signUpCredentials.customerLastName,
          email: state.signUpCredentials.customerSignUpEmail,
          password: state.signUpCredentials.customerSignUpPassword,
        }
         dispatch(createCustomerInitiate(data))
      }
      }
    }
  
  const submitLogIn = () => {
    const errors = []
    fields.inputs.map(itm => {
      if (!state.loginCredentials[itm.key] || state.loginCredentials[itm.key].length === 0) {
          errors.push(itm.key)
      }
      if(itm.name === 'Email' && !validateEmail(state.loginCredentials[itm.key])) {
        errors.push(itm.key)
      } 
    })
    updateState({
      path: 'required',
      value: errors
    })
    if(errors.length === 0) {
      const data = {
        email: state.loginCredentials.emailLogin,
        password: state.loginCredentials.passwordLogin
      }
      dispatch(userLoginInitiate(data))
    }
  } 

  const secureEntry = (key) => {
    let entries = cloneDeep(state.secureEntries)
    let newEntries = []
    if(entries.includes(key)) {
       newEntries = entries.filter(ent => ent !== key)
    }else {
      newEntries = cloneDeep(entries)
      newEntries.push(key)
    }
    updateState({
      path: "secureEntries",
      value: newEntries
    })
  }

  const handleChange = (path, key, value) => {  
     if(key) {
      let upStat = cloneDeep(state[path])
      upStat[key] = value
      updateState({
        path: path,
        value: upStat
      })
     }else {
      updateState({
        path: path,
        value: value
      })
     }
  }

  return (
    <Wrapper> 
      {
        (authSuccess || authFailure) && 
        <Toaster message={authText} type={authFailure ? 'error' : 'success'}/>
      }
      {
      fields && fields.inputs.map(itm=>{
        return(
          <InputWrap>
            <FontAwesomeIcon icon={itm.icon} size={20} color='#f1f1f1'/>
            <StyledInput
              placeholder={itm.name}
              value={state.loginCredentials[itm.key]}
              key={itm.key}
              secureTextEntry={itm.name ==='Password' && !state.secureEntries.includes(itm.key)}
              required={state.required.includes(itm.key)}
              onChangeText={(text) => handleChange('loginCredentials',itm.key, text)}
            />
            {
              itm.name === 'Password' &&
              <View style={{top: 13, right: 8, position: "absolute"}}>
              <FontAwesomeIcon 
                onPress={() => secureEntry(itm.key)} icon="eye-slash" size={17} color='grey'/>
              </View>
            }
          </InputWrap>
        )
      })
      } 
      <LoginButton onPress={() => loginLoader ? null : submitLogIn()}>
        {
          loginLoader ?                   
         <LoaderView login>
          <Loader color="white" size={12}/>
        </LoaderView> 
        :
          <StyledText size={20} weight={400} color="white">
            Login
          </StyledText>
        }

      </LoginButton>
      <NoAccount>
        <StyledText size={15} weight={400} color="grey">Don't have an account ? </StyledText>
        <StyledText onPress={() => modalShow(true)} size={15} weight={600} color="#032bf1">Sign Up</StyledText>
      </NoAccount>
     <Modal
        useNativeDriver={true}
        modalStyle={{display:'flex',justifyContent: 'center'}}
        width={0.8}
        modalTitle={<ModalTitle title="Sign Up" />}
        visible={state.modalVisible}
        onTouchOutside={() => modalShow(false)}
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        footer={
          <ModalFooter>
            <Footer>
            {
              fields.modalFooter.map((btn, index) => {
                if(btn === 'Sign Up' && signUpLoader) {
                  return (
                     <LoaderView>
                       <Loader/>
                     </LoaderView>
                  )
                }
                 return (
                   <FooterButtton 
                    onPress={() => btn === 'Sign Up' ? submitSignUp() : modalShow(false)}
                    border={index % 2 === 0}>
                     <StyledText size={20} weight={500} color={btn === 'Sign Up' ? 'gold' : 'grey'}>
                        {btn}
                     </StyledText>
                   </FooterButtton>
                 )
              })
            }
            </Footer>
          </ModalFooter>
        }
        >
          <ModalContent>
            <ModalView>
             <ModalTopBar>
               {
                 fields.modalTop.map((itm, index) => {
                   return (
                    <ModalTopContent
                     border={index % 2 === 0} 
                     onPress={() => handleChange('signUpType',null ,itm)} 
                     active={state.signUpType === itm}
                    >
                    <StyledText size={15} weight={500} color="black">{itm}</StyledText> 
                    </ModalTopContent>
                   )
                 })
               }
             </ModalTopBar>
             <SignUpContent>
               {
                signUpMap().map(itm => {
                  return(
                    <InputWrap>
                      <StyledInput
                        signUp
                        placeholder={itm.name}
                        value={state.signUpCredentials[itm.key]}
                        secureTextEntry={itm.name ==='Password' && !state.secureEntries.includes(itm.key)}
                        required={state.required.includes(itm.key)}
                        key={itm.key}
                        onChangeText={(text) => handleChange('signUpCredentials',itm.key, text)}
                      />
                      {
                        itm.name === 'Password' &&
                        <View style={{top: 13, right: 17, position: "absolute"}}>
                        <FontAwesomeIcon 
                          onPress={() => secureEntry(itm.key)} icon="eye-slash" size={17} color='grey'/>
                        </View>
                      }
                    </InputWrap>
                  )
                }) 
                }
               </SignUpContent>
            </ModalView>
          </ModalContent>
        </Modal>
    </Wrapper>
  )
}

export default Auth;