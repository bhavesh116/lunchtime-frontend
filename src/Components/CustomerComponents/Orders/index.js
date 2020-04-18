import  React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native'
import Loader from '../../Common/Loader'
import Modal, { ModalContent } from 'react-native-modals';
import { getAllOrdersInitiate , cancelOrderInitiate, orderToasterRemove } from '../../../redux/actions/CustomerActions/orders'
import styled, {css} from 'styled-components/native'
import Toaster from '../../Common/Toaster'

const Wrapper = styled.View`
 height: 100%;
 width: 100%; 
 display: flex;
 flex-direction: column;
`
const Header = styled.View`
 height: 60px;
 width: 100%;
 background-color: white;
 border-bottom-width: 1px;
 border-bottom-color: #f5ce00;
 display: flex;
 flex-direction: row;
 padding-left: 10px;
 align-items: center;
`

const OrderWrapper = styled.ScrollView`
 height: 100%;
 width: 100%;
`

const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color}
 `}
 ${({bottom}) => bottom && css`
   margin-bottom: ${bottom}px;
`}
`
const OrderCard = styled.View`
 margin: 10px 0px;
 height: 240px;
 width: 100%
 background-color: white;
 display: flex;
 flex-direction: column;
`

const OrderContent = styled.View`
 height: 100%;
 width: 100%;
 padding: 8px;
`

const DetailContent = styled.View`
 display: flex;
 width: 80%;
 margin: 3px 0px;
 flex-direction: row;
`

const KeyView = styled.View`
 display: flex;
 min-width: 70px;
 max-width: 70px;
`

const PairView = styled.View`
 display: flex;
 margin-left: 40px;
`

const OrderDetailsWrapper = styled.View`
 height: 100%;
 width: 100%;
 margin-top: 10px;
`

const NoOrders = styled.View`
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin-top: 20px;
`


const StatusAndCancelWrap = styled.View`
 display: flex;
 flex-direction: row;
 width: 100%;
 align-items: center;
 margin-top: 5px;
 justify-content: space-between;
`

const StatusView = styled.View`
 display: flex;
 flex-direction: row;
 align-items: center;
`
const FlexiView = styled.View`
 display: flex;
 width: 172px;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`
const CancelButton = styled.TouchableOpacity`
 height: 30px;
 width: 110px;
 padding: 3px;
 border-color: red;
 border-width: 1px;
 display: flex;
 align-self-flex-end;
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

const LoaderWrap = styled.View`
 height: 80%;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
`

const StyledRefreshControl = styled.RefreshControl`
 
`

const Orders = () =>  {
  const dispatch = useDispatch()
  const ordersState = useSelector(state => state.orders)
  const [modalState, setModalState] = useState({state: false, value:""})
  const [refreshing, setRefreshing] = useState(false)
  const { 
    orders,
    ordersLoader,
    orderText,
    success,
    refreshF,
    failure, 
    cancelOrderLoader,
    loaderId
  } = ordersState

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllOrdersInitiate())
      return () => {
         
      };
    }, []))

  useEffect(() => {
    if( success || failure ) {
      dispatch(getAllOrdersInitiate())
    }  
  },[success, failure])

  useEffect(() => {
      setRefreshing(false)
  },[refreshF])

  const statusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'green'
      case 'Ordered':
        return 'gold'
      case 'Cancelled':
        return 'red'
      case 'Completed':
        return 'black'
    }
  }
   
   const orderContent = (order) => {
     const obj = {}
     obj.Name = order.name
     obj.Price = order.price
     obj.Quantity = order.quantity
     obj.Date = '12/12/1998'
     obj['Serve time'] = '23:30 PM'
     
     return Object.keys(obj).map(data => {
       return (
         <DetailContent>
           <KeyView>
           <StyledText color="grey">
             {data}:
           </StyledText>
           </KeyView>
           <PairView pair>
           <StyledText>
             {
               data === 'Price' ? 
               `₹${obj[data]}`
               : 
              `${obj[data]}`
             }       
           </StyledText>
           </PairView>
         </DetailContent>
       )
     })
   }

    return (
      <Wrapper>
         {/* {
          orderText.length > 0 && 
           <Toaster message={orderText} type={failure ? 'error' : 'success'} />
         } */}
       <Header>
         <StyledText size={18}>
           My Orders
         </StyledText>
       </Header>
         { 
           ordersLoader ?  <LoaderWrap><Loader color="black" size={12}/></LoaderWrap>
           :
           <OrderWrapper
          refreshControl={
            <StyledRefreshControl refreshing={refreshing} onRefresh={() => {
              dispatch(getAllOrdersInitiate())
              setRefreshing(true)
            }} />
          }  
       >
         { orders.length > 0 ?
           orders.map(order => {
             return (
              <OrderCard> 
              <OrderContent>    
              <StyledText size={23}>
                Order details
              </StyledText>
              <OrderDetailsWrapper>
                   {
                     orderContent(order)
                   }
                   <StatusAndCancelWrap>
                   <StatusView>
                   <KeyView>
                   <StyledText color="grey" size={17}>
                     Status: 
                   </StyledText>
                   </KeyView>
                    <PairView>
                   <StyledText color={() => statusColor(order.status)}size={17}>
                     {order.status}
                   </StyledText>
                   </PairView>
                   </StatusView>
                    { order.status === 'Pending' &&
                      <CancelButton onPress={() => setModalState({state: true, value: order.orderId})} >
                      {
                        cancelOrderLoader && loaderId === order.orderId ?
                        <Loader color="red" size={9} />
                        :
                        <StyledText color="red" size={17}>
                          Cancel order
                        </StyledText>
                      }
                    </CancelButton>
                    }
                   </StatusAndCancelWrap>
              </OrderDetailsWrapper>
              </OrderContent>    
            </OrderCard>
             )
           })
           : <NoOrders><StyledText color="grey" size={20}>No Orders found</StyledText></NoOrders>
         }
       </OrderWrapper>
         }
       <Modal
         useNativeDriver={true}
         width={0.8}
         visible={modalState.state}
         onTouchOutside={() => setModalState({state: false, value:""})}
        >
          <ModalContent>
           <ModalView>
             <View style={{width: '73%'}}>
             <StyledText size={15}>Are you sure you want to cancel this order</StyledText>
             </View>
             <ModalButtonRemove modal>
                <StyledText onPress={() => {
                  dispatch(cancelOrderInitiate({dishId: modalState.value, action:"cancel"}))
                  setModalState({state: false, value:""})
                }} size={14} color="white">
                  Cancel
                </StyledText>
             </ModalButtonRemove>
           </ModalView>
          </ModalContent>
        </Modal>
      </Wrapper>
    );
  }

export default Orders