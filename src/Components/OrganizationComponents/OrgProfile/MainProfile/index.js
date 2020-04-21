import  React, { useEffect, useState  } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { getOrganizationProfileInitiate, removeOrgProfileToast } from '../../../../redux/actions/OrganizationActions/orgProfile'
import styled, {css} from 'styled-components/native'
import { useFocusEffect } from '@react-navigation/native';
import Modal, { ModalContent } from 'react-native-modals';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Loader from '../../../Common/Loader';


const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 background-color: white;
`
const ScrollWrap = styled.ScrollView`
 height: 100%;
 width: 100%;
`

const ProfileInfo = styled.View`
 height: 200px
 width: 100%;
 display:flex;
 flex-direction: row;
 align-items: center;
 padding: 20px;
`

const ImageView = styled.Image`
 height: 100px;
 width: 100px;
 border-color: gold;
 border-width: 2px;
 border-radius: 50px;
`

const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color}
 `}
`

const UserData = styled.View`
 padding: 10px;
 display: flex;
 flex-direction: column;
`

const InnerWrap = styled.View`
 display: flex;
 height: 100%;
 width:100%;
 flex-direction: column;
`
const FavouritesWrap = styled.View`
 display: flex;
 flex-direction: column;
 padding: 20px;
`

const FavouritesContent = styled.View`
 display: flex;
 margin-top: 10px;
 flex-direction: row;
 flex-wrap: wrap;
`
const Header = styled.View`
 height: 60px;
 width: 100%;
 background-color: white;
 border-bottom-width: 1px;
 border-bottom-color: #f5ce00;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 padding: 0px 10px;
 align-items: center;
`

const FavouritesBlock = styled.View`
 height: 30px;
 padding: 8px;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 margin: 5px 3px;
 border-width: 1px;
 border-color: #f5ce00;
 border-radius: 5px;
`

const EditView = styled.View`
  position: absolute;
  left: 100px;
  bottom: 50px;
`

const NoFavs = styled.View`
 display: flex;
 flex-direction: row;
 justify-content: center;
`

const LogoutModal = styled.View`
 display: flex;
 flex-direction: row;
 padding: 0px 10px;
 justify-content: space-between;
 align-items: center;
`

const AddFavBlock = styled.View`
 display: flex;
 flex-direction: row;
 align-items: center;
 width: 100%;
`

const AddFavInput = styled.TextInput`
 height: 50px;
 width: 60%;
`

const AddFavButton = styled.TouchableOpacity`
 height: 30px;
 width: 30%;
 display: flex;
 border-radius: 5px;
 background-color: #f5ce00;
 justify-content: center;
 align-items: center;
`

const LogoutButton = styled.TouchableOpacity`
 height: 30px;
 width: 60px;
 border-color: red
 border-width: 1px;
 display: flex;
 justify-content: center;
 align-items: center;
`

const LoaderWrapper = styled.View`
 height: 80%;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
`

const Profile = (props) => {
  const { navigation:{ navigate } } = props
  const profileState = useSelector(state => state.orgProfile)
  const dispatch = useDispatch()
  const {
    orgProfile,
    orgProfileLoader,
    tabText,
    refreshF,
  } = profileState

  const [modalState, setModalState] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getOrganizationProfileInitiate())
      return () => {
         
      };
    }, []))

    useEffect(() => {
     if(tabText.length > 0) {
      dispatch(removeOrgProfileToast())
     }
    }, [tabText])

  const logOut = async () => {
    setModalState(false)
    await AsyncStorage.clear()
    navigate('Auth')
  }

   return (
     <Wrapper>
        <Header>
         <StyledText size={18}>
           Profile
         </StyledText>
         <StyledText onPress={() => setModalState(true)} color="red" size={16}>
           Log out
         </StyledText>
       </Header>
       <ScrollWrap>
        {
          !orgProfileLoader ?
          <InnerWrap>
          <ProfileInfo>
            <ImageView source={{uri: orgProfile.avatarUrl}}/>
            <EditView>
            <FontAwesomeIcon onPress={() => navigate('Edit Org Profile', orgProfile)} icon="edit" size={25} color='black'/>
            </EditView>
            <View style={{marginLeft: 10}}>
               <UserData>
               <View><StyledText size={18}>{orgProfile.orgName}</StyledText></View>
               <View><StyledText color="grey">{orgProfile.email}</StyledText></View>
               </UserData>
            </View>
          </ProfileInfo>
          </InnerWrap>
          : <LoaderWrapper><Loader color="black" size={12} /></LoaderWrapper>
        }
       </ScrollWrap>
       <Modal
         useNativeDriver={true}
         width={0.8}
         visible={modalState}
         onTouchOutside={() => setModalState(false)}
        >
          <ModalContent>
          <LogoutModal>
           <View>
             <StyledText size={16}>
               Log out of lunchtime
             </StyledText>
           </View>
           <LogoutButton>
           <StyledText onPress={logOut}color="red">
               Log out
             </StyledText>
           </LogoutButton>
          </LogoutModal>
          </ModalContent>
        </Modal>
     </Wrapper>
   )
}

export default Profile