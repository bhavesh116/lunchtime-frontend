import  React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, {css} from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { 
    getRequestsInitiate,
    acceptRejectCustomerInitate,
    removeCustomerToast 
} from '../../../../redux/actions/OrganizationActions/orgCustomers'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
 background-color: white;
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

const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color};
 `}
`

const AcceptRejectView = styled.View`
 display: flex;
 flex-direction: row;
 width: 75%;
 padding-right: 100px;
 justify-content: space-between;
 margin-top: 10px;
`

const NoCustomer = styled.View`
 display: flex;
 width: 100%;
 margin-top: 20px;
 flex-direction: row;
 justify-content: center;
`

const OrgRequests = ({navigation}) => {
   const { navigate } = navigation
   const dispatch = useDispatch()
   const [requestData, setRequestData] = useState([])
   const customerState = useSelector(state => state.customers)
   const {
       requests,
       requestsLoader,
       tabText,
   } = customerState

   console.log('reqqq', requests)

   useEffect(() => {
        dispatch(getRequestsInitiate())
        if(requests.length > 0) {
            setRequestData(requests)
        }
    }, [])

   useEffect(() => {
    if(tabText.length > 0) {
        ToastAndroid.showWithGravity(
            tabText,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
       )
       dispatch(removeCustomerToast())
       dispatch(getRequestsInitiate())
    }
   }, [tabText])

   const acceptRejectFunc = (reqId , id, action) => {
      dispatch(acceptRejectCustomerInitate({requestId: reqId, customerId: id, action: action}))
      let arr = requestData.filter(req => req._id !== reqId)
      setRequestData(arr)
   }

   return (
       <Wrapper>
           <ScrollWrap>
               <CustomersWrap>
                   {
                      requestData.length > 0 ? requestData.map(request => {
                          return (
                              <CustomerCard>
                                  <ImageView source={{uri: request.avatarUrl}}/>
                                  <CustomerContent>
                                      <StyledText size={17}>{request.name}</StyledText>
                                      <StyledText color="grey">{request.email}</StyledText>
                                      <AcceptRejectView>
                                      <StyledText onPress={() => acceptRejectFunc(request._id, request.customerId, 'accept')} size={18} color="#23395d">Accept</StyledText>
                                      <StyledText onPress={() => acceptRejectFunc(request._id, request.customerId, 'reject')} size={18} color="red">Reject</StyledText>
                                      </AcceptRejectView>
                                  </CustomerContent>
                              </CustomerCard>
                          )
                       })
                       : <NoCustomer><StyledText size={17} color="grey" >No pending requests</StyledText></NoCustomer>
                   }
               </CustomersWrap>
           </ScrollWrap>
       </Wrapper>
   )
}

export default OrgRequests