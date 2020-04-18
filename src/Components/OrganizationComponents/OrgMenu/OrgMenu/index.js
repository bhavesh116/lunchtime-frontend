import  React, { useEffect, useState , useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter } from 'react-native-modals';
import { getOrgMenusInitiate, menuActionInitiate ,removeMenuToast} from '../../../../redux/actions/OrganizationActions/orgMenu'
import styled, {css} from 'styled-components/native'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Loader from '../../../Common/Loader'

const Wrapper = styled.View`
 height: 100%;
 width: 100%;
`
const ScrollView = styled.ScrollView`
 height: 100%; 
 width: 100%;
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

const MenuCard = styled.View`
 min-height: 200px;
 width: 100%;
 margin: 10px 0px;
 display: flex;
 flex-direction: column;
 background-color: white;
`

const CreatDishView = styled.View`
 display: flex;
 width: 140px;
 align-items: center;
 flex-direction: row;
 justify-content: space-between;
`

const NoMenus = styled.View`
 display: flex;
 width: 100%;
 margin-top: 20px;
 flex-direction: row;
 justify-content: center;
`

const KeyPair = styled.View`
 display: flex;
 padding: 0px 10px;
 width: 100%;
 margin: 8px 0px;
 flex-direction: row;
 align-items: center;
`

const ButtonsWrap = styled.View`
 display: flex;
 flex-direction: row;
 border-top-color: #f1f1f1;
 width: 100%;
 border-top-width: 1px;
 padding: 10px;
`
const StyledButton = styled.TouchableOpacity`
 display: flex;
 height: 35px;
 width: 50%;
 justify-content: center;
 align-items: center;
 ${({borderLeft}) => borderLeft && css`
   border-left-color: #f1f1f1;
   border-left-width: 1px;
 ` }
`
const StyledText = styled.Text`
 ${({size}) => size && css`
  font-size: ${size}px;
 `}
 ${({color}) => color && css`
   color: ${color};
 `}
 ${({width}) => width && css`
   width: ${width}%;
 `}
`
const OrderedBy = styled.TouchableOpacity`
 padding: 0px 5px;
 border-color: gold;
 border-width: 1px;
`
const OrgMenu = ({navigation}) => {
   const { navigate } = navigation 
   const dispatch = useDispatch()
   const menuState = useSelector(state => state.orgMenu)
   const {
       menus,
       menuLoader,
       tabText,
       refreshF,
       removeMenuLoader,
       acceptRejectLoader
   } = menuState

   console.log('menus', menus)

   const buttons = ['Cancel order', 'Place order', 'Order Completed']

   useEffect(() => {
      dispatch(getOrgMenusInitiate())
   }, [])

   useEffect(() => {
    if(tabText.length > 0) {
       dispatch(removeMenuToast())
       dispatch(getOrgMenusInitiate())
    }
 }, [tabText])

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

  const  buttonColor = (btn) => {
    switch(btn) {
      case 'Cancel order':
        return 'red'
      case 'Place order':
        return 'gold'
      case 'Order Completed':
        return '#23395d'
    }
  }

  const orderAction = (order, action) => {
    const dishId = order._id
    let status;
    if(action === 'Place order') {
      status = 'Ordered'
    }
    if(action === 'Cancel order') {
      status = 'Cancelled'
    }
    if(action === 'Order Completed') {
      status = 'Completed'
    }
    dispatch(menuActionInitiate({dishId, status}))
  }

  const showButtons = (status) => {
    if(status === 'Completed' || status === 'Cancelled' ) {
      return false
    }
    return true
  }

   return (
      <Wrapper>
          <Header>
          <StyledText size={18}>
           Menu
          </StyledText>
           <CreatDishView>
           { 
            <StyledText size={18}>
             Create menu
           </StyledText> 
           }
           <FontAwesomeIcon onPress={() => navigate('Create menu')}color="#f5ce00" icon="plus-square" size={23}/>
           </CreatDishView>
          </Header>
          <ScrollView>
             {
               menus.length > 0 ? 
                menus.reverse().map(itm => {
                  return (
                    <MenuCard>
                      <KeyPair>
                        <StyledText size={16} width={30} color="grey" >Name</StyledText>
                        <StyledText size={16} width={70}>{itm.dishName}</StyledText>
                      </KeyPair>
                      <KeyPair>
                      <StyledText size={16} width={30} color="grey" >Price</StyledText>
                       <StyledText size={16} width={70}>{`₹ ${itm.price}`}</StyledText>
                      </KeyPair>
                      <KeyPair>
                       <StyledText size={16} width={30} color="grey" >Date</StyledText>
                       <StyledText  size={16}width={70} >{moment(itm.serveTime).format('DD/MM/YYYY')}</StyledText>
                      </KeyPair>
                      <KeyPair>
                       <StyledText size={16} width={30} color="grey" >Serving time</StyledText>
                       <StyledText  size={16}width={70} >{moment(itm.serveTime).format('hh:mm:A')}</StyledText>
                      </KeyPair>
                      <KeyPair>
                       <StyledText size={16} width={30} color="grey" >Order status</StyledText>
                       <StyledText size={16} color={() => statusColor(itm.status)} width={70} >{itm.status}</StyledText>
                      </KeyPair>
                      <KeyPair> 
                       <StyledText size={16} width={30} color="grey" >Orderd by</StyledText>
                       <OrderedBy>
                        <StyledText size={16} >{`${itm.confirmedCustomers.length} employees`}</StyledText>
                       </OrderedBy>
                      </KeyPair>
                      <ButtonsWrap>
                        { showButtons(itm.status) ?
                          buttons.map((btn, index) => {
                            if(itm.status === 'Cancelled' ||
                             (itm.status === 'Ordered' && btn === 'Place order') ||
                             (itm.status === 'Pending' && btn === 'Order Completed')) {
                              return null
                            } else {
                                return (
                                  <StyledButton borderLeft={index % 2 !== 0} onPress={() => orderAction(itm, btn)}>
                                    <StyledText color={() => buttonColor(btn)}>
                                      {btn}
                                    </StyledText>
                                  </StyledButton>
                                )
                            }
                          })
                          : null
                        } 
                      </ButtonsWrap>
                    </MenuCard>
                  )
                })
                :
                <NoMenus><StyledText size={17} color="grey" >No customers in organization</StyledText></NoMenus>
             }
          </ScrollView>
      </Wrapper>
   )
}

export default OrgMenu