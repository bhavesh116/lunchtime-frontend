import  React, { useEffect, useState , useMemo } from 'react';
import { Text, View, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Modal, { ModalContent } from 'react-native-modals';
import styled, {css} from 'styled-components/native'

import { 
    getCustomersInitiate,
    removeCustomerInitiate,
    removeCustomerToast 
} from '../../../../redux/actions/OrganizationActions/orgCustomers'

const Wrapper = styled.View`
 height: 100%;
 width: 100%; 
 background-color: white;
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

const ScrollWrap = styled.ScrollView`
 height: 100%;
 width: 100%;
`
const CustomersWrap = styled.View`
 height: 100%;
 width: 100%;
 display: flex; 
 flex-direction: column;
`

const CustomerCard = styled.View`
 height: 100px;
 padding-top: 15px;
 border-bottom-width: 1px;
 border-bottom-color: #f1f1f1;
 display: flex;
 flex-direction: row;
`

const ImageView = styled.Image`
 height: 70px;
 width: 75px;
`

const CustomerContent = styled.View`
 display: flex;
 width: 100%;
 padding-left: 10px;
 flex-direction: column;
 `

 const DeleteView = styled.View`
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-top: 10px;
  align-items: flex-end;
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

const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color};
 `} 
`
const NoCustomer = styled.View`
 display: flex;
 width: 100%;
 margin-top: 20px;
 flex-direction: row;
 justify-content: center;
`

const OrgCustomers = ({navigation}) => {
   const { navigate } = navigation
   const dispatch = useDispatch()
   const [modalState, setModalState] = useState({state: false, value:""})
   const customerState = useSelector(state => state.customers)
   const {
       customers,
       customersLoader,
       tabText,
       refreshF
   } = customerState

   useEffect(() => {
      dispatch(getCustomersInitiate())
   }, [])

   console.log('ccccnc', customers)

   useEffect(() => {
    if(tabText.length > 0) {
        ToastAndroid.showWithGravity(
            tabText,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
       );
       setModalState({state: false, value:""})
       dispatch(removeCustomerToast())
       dispatch(getCustomersInitiate())
    }
   }, [tabText])

   return (
       <Wrapper>
           <Header>
               <StyledText  size={18}>
                   Customers
               </StyledText>
               <StyledText onPress={() => navigate('Requests')} color="#23395d" size={16}>
                   Requests
               </StyledText>
           </Header>
           <ScrollWrap>
               <CustomersWrap>
                   {
                       customers.length > 0 ? customers.map(customer => {
                          return (
                              <CustomerCard>
                                  <ImageView source={{uri:customer.avatarUrl}}/>
                                  <CustomerContent>
                                      <StyledText size={17}>{customer.fullName}</StyledText>
                                      <StyledText color="grey">{customer.email}</StyledText>
                                      <DeleteView><StyledText onPress={() => setModalState({state: true, value: customer._id})} color="red">Remove</StyledText></DeleteView>
                                  </CustomerContent>
                              </CustomerCard>
                          )
                       })
                       : <NoCustomer><StyledText size={17} color="grey" >No customers in organization</StyledText></NoCustomer>
                   }
               </CustomersWrap>
           </ScrollWrap>
           <Modal
             useNativeDriver={true}
             width={0.8}
             visible={modalState.state}
             onTouchOutside={() => setModalState({state: false, value:""})}
        >
          <ModalContent>
           <ModalView>
             <View style={{width: '73%'}}>
             <StyledText size={15}>Are you sure you want to remove this Customer</StyledText>
             </View>
             <ModalButtonRemove modal>
                <StyledText onPress={() => dispatch(removeCustomerInitiate({customerId: modalState.value}))} size={14} color="white">
                  Remove
                </StyledText>
             </ModalButtonRemove>
           </ModalView>
          </ModalContent>
        </Modal>
       </Wrapper>
   )
}

export default OrgCustomers