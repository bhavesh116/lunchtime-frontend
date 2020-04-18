import  React, { useEffect, useState , useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { getOrganizationsInitiate,
         disconnectFromOrgInitiate,
         searchOrganizationInitiate,
         sendUnsendRequestInitiate,
         removeToaster 
} from '../../../redux/actions/CustomerActions/organizations'
import { useFocusEffect } from '@react-navigation/native';
import styled, {css} from 'styled-components/native'
import Modal, { ModalContent } from 'react-native-modals';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Toaster from '../../Common/Toaster'
import Loader from '../../Common/Loader'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;
`
const Header = styled.View`
 display: flex;
 flex-direction: row;
 padding: 5px 10px;
 background-color: white;
 height: 55px;
 width: 100%;
 align-items: center;
`

const FindOrgInput = styled.TextInput`
 border-radius: 5px;
 width: 85%;
 margin-left: 10px;
`

const ContentWrapper = styled.View`
 display: flex;
 height: 100%;
 background-color: white;
 flex-direction: column;
`

const OrganizationsWrapper = styled.View`
 display: flex
 align-items: center
 flex-direction: column;
`

const OrgCard = styled.View`
 height: 113px;
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 padding: 0px 10px;
 border-bottom-color: #f1f1f1;
 border-bottom-width: 1px;
`

const StyledImage = styled.Image`
 height: 70px;
 width: 70px;
 margin-right: 20px;
 border-color: gold;
 border-width: 2px;
 border-radius: 50px;
`

const NoOrg= styled.Text`
 font-size: 15px;
 font-weight: 600;
 margin-top: 10px;
`

const OrgDetails = styled.View`
 display: flex;
 align-self: flex-start;
 padding-top: 15px;
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

const RemoveOrgButton = styled.TouchableOpacity`
 height: 30px;
 width: 80px;
 border-color: red;
 border-radius: 5px;
 border-width: 1px;
 position: relative;
 top: 10px;
 left: 170px;
 display: flex;
 align-items: center;
 justify-content: center;

 ${({modal}) => modal && css`
   background-color: red;
 `}
`
const SendUnsendButton = styled.TouchableOpacity`
 height: 35px;
 width: 110px;
 border-color: blue;
 border-radius: 5px;
 border-width: 1px;
 position: relative;
 top: 5px;
 display: flex;
 align-items: center;
 justify-content: center;
`

const ModalView = styled.View`
 height: 40px;
 display: flex;
 flex-direction: row;
 align-items: center;
 width: 97%;
`
const ModalButtonRemove = styled.TouchableOpacity`
 height: 30px;
 width: 80px;
 margin: 0px 5px;
 border-radius: 5px;
 align-items: center;
 justify-content: center;
 background-color: red;
`

const NoOrgView = styled.View`
 display: flex;
 width: 100%;
 flex-direction: row;
 justify-content: center;
`
const LoaderView = styled.View`
 display: flex;
 align-items: center;
 justify-content: center; 
`

const StyledRefreshControl = styled.RefreshControl`
 
`

const OrganizationsScrollWrap = styled.ScrollView`
 height: 100%;
 width: 100%;
`
export default function HomeScreen() {
const dispatch = useDispatch()
const organizationsState = useSelector(state => state.organizations)

const {
  organizations,
  organizationsLoader,
  searchedOrg,
  searchOrgLoader,
  tabText,
  refreshF,
  requestLoader,
  disconnectSuccess,
  disconnectFailure,
  sendReqSuccess,
  sendReqFailure,
  toasterShow
} = organizationsState

const [input, setInput] = useState('')
const [userData, setUserData] = useState('')
const [refreshing, setRefreshing] = useState(false)
const [modalState, setModalState] = useState({state: false, value:""})

 useMemo(() => {
  AsyncStorage.getItem('userData').then(data => {
    return JSON.parse(data)
    }).then(uData => setUserData(uData))
 }, []) 

 useFocusEffect(
  React.useCallback(() => {
    dispatch(getOrganizationsInitiate()) 
    return () => {
       
    };
  }, []))

useEffect(() => {
    setRefreshing(false)
},[refreshF])

useEffect(() => {
    if(input.length > 0) {
      dispatch(searchOrganizationInitiate({orgName: input}))
    }
},[input, sendReqSuccess])

 const retrnToasterStyle = () => {
   if(disconnectFailure ||  sendReqFailure ) {
    return 'error'
   }
   return 'success'
 }

  useEffect(() => {
    setModalState({state: false, value: ""})
    setTimeout(() =>dispatch(removeToaster()), 3000)
    dispatch(getOrganizationsInitiate())    
  },[disconnectSuccess, disconnectFailure, sendReqSuccess, sendReqFailure])

  const requestAction = (requests, id) => {
    let obj = {orgId: id, action:"send"}
    if(requests.includes(userData.userId)) {
      obj.action = 'unsend'
    }
    dispatch(sendUnsendRequestInitiate(obj))
  }

  const searchedButtonType = (org) => {
    console.log('org is', org)
      if(!org.customers.includes(userData.userId)) {
        return (
          <SendUnsendButton 
           onPress={() =>  !requestLoader && requestAction(org.requests, org._id)}>
           {
             !requestLoader ?
             <StyledText size={14} color="blue">
             {
               org.requests.includes(userData.userId) ? 'Remove request' : 'Send request'
             }
           </StyledText>
             : <Loader color="blue" size={8} />
           }
          </SendUnsendButton>
        )
      }
      return null 
  }

  const searchResults = () => {
    if(Object.keys(searchedOrg).length > 0) {
      return (
        <OrgCard>
        <StyledImage
          source={require(`../../../static/av1.png`)} 
        />
        <OrgDetails>
        <StyledText size={23}>
          {searchedOrg.orgName}
        </StyledText>
        <StyledText>
          email: {searchedOrg.email}
        </StyledText>
          {
            searchedButtonType(searchedOrg)
          }
        </OrgDetails>
        </OrgCard>
      )
    } return (
      <NoOrgView>
      <StyledText size={23} color="grey">
        No Organization found
      </StyledText>
      </NoOrgView>
    )
  }

    return (
      <Wrapper>
        { toasterShow &&
          <Toaster message={tabText} styles={retrnToasterStyle}/>
        }
        <Header>
        <FontAwesomeIcon icon="search" size={25} color='#f1f1f1'/>
         <FindOrgInput
           placeholder="Find organization by name"
           key="findOrg"
           value={input}
           onChangeText={(text) => setInput(text)}
         />
        </Header>
        <ContentWrapper>
          {
            input.length > 0 ?
             searchResults()
             :
             <OrganizationsScrollWrap
             refreshControl={
                <StyledRefreshControl refreshing={refreshing} onRefresh={() => {
                  dispatch(getOrganizationsInitiate())
                  setRefreshing(true)
                }} />
              }
             >
             <OrganizationsWrapper>
             {
               organizations.length > 0 ?
               organizations.map(org => {
                 return(
                 <OrgCard>
                 <StyledImage
                   //source={require('../../../static/av6.png')} 
                   source={{uri:"https://i.ibb.co/QD85QZK/user.png"}}
                 />
                 <OrgDetails>
                 <StyledText size={23}>
                   {org.orgName}
                 </StyledText>
                 <StyledText>
                   email: {org.email}
                 </StyledText>
                 <RemoveOrgButton>
                 <StyledText onPress={() => setModalState({state: true, value: org._id})} size={14} color="red">
                   Remove
                 </StyledText>
                 </RemoveOrgButton>
                 </OrgDetails>
                 </OrgCard>
                 )
               })
             : <NoOrg>
                 You are not connected to any organizations !
               </NoOrg>
             }
           </OrganizationsWrapper>
           </OrganizationsScrollWrap>
          }

        </ContentWrapper>
        <Modal
         useNativeDriver={true}
         width={0.8}
         visible={modalState.state}
         onTouchOutside={() => setModalState({state: false, value:""})}
        >
          <ModalContent>
           <ModalView>
             <View style={{width: '73%'}}>
             <StyledText size={15}>Are you sure you want to remove this organization</StyledText>
             </View>
             <ModalButtonRemove modal>
                <StyledText onPress={() => dispatch(disconnectFromOrgInitiate({orgId: modalState.value}))} size={14} color="white">
                  Remove
                </StyledText>
             </ModalButtonRemove>
           </ModalView>
          </ModalContent>
        </Modal>
      </Wrapper>
    );
  }