import  React, { useEffect, useState, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { cloneDeep } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Loader from '../../Common/Loader'
import { getMenuInitiate, placeOrderInitiate, menuToasterRemove } from '../../../redux/actions/CustomerActions/menu'
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


const MenuWrapper = styled.ScrollView`
 height: 100%;
 width: 100%;
`
const OrderWrapper = styled.View`
  margin: 10px 0px;
  height: 250px;
  width: 100%;
  display: flex;
  padding: 0px 10px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  background-color: white;
  border-bottom-color: #f1f1f1;
`

const OrderContent = styled.View`
 display: flex;
 width: 68%;
 padding-top: 10px;
 flex-direction: column;
 justify-content: flex-end; 
 height: 100%;
 width: 100%;
`

const OrderButtom = styled.TouchableOpacity`
 display: flex;
 height: 45px;
 width: 72%;
 background-color: black;
 align-items: center;
 justify-content: center;
`

const OrgInfo = styled.View`
display: flex;
height: 100%;
width: 32%;
padding: 13px 0px;
align-items: center;
border-right-color: #f1f1f1;
border-right-width: 1px;
flex-direction: column;
`

const StyledImage = styled.Image`
 margin-top: 30px;
 height: 70px;
 width: 70px;
 border-color: gold;
 border-width: 2px;
 border-radius: 50px;
`

const DetailContent = styled.View`
 display: flex;
 align-items: center;
 flex-direction: row;
`

const DetailKey = styled.View`
 width: ${({width}) => width}%;
 ${({bb}) => bb && css`
 max-width: 140px;
 `}
`

const QuantityAndButton = styled.View`
 display: flex;
 flex-direction: column;
`

const LoaderView = styled.View`
 height: 50%;
 width: 100%;
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`

const DetailWrap = styled.View`
 display: flex;
 height: 82.5%;
 width: 100%;
 flex-direction: column;
 justify-content: space-between;
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
${({mLeft}) => mLeft && css`
 margin-left: 10px;
`} 
`

const Details = styled.View`
 margin-left: 10px;
`

const IncrementDecrementView = styled.View`
 height: 35px;
 width: 65%
 margin: 10px 10px;
 display: flex;
 flex-direction: row;
 align-items: center;
`

const IncrementDecrementActions = styled.View`
 display: flex;
 width: 60%;
 flex-direction: row;
 margin-left: 30px;
 justify-content: space-between;
 align-items: center;
`

const NoMenu = styled.View`
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin-top: 20px;
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

const MenuToday = () => {
   const dispatch = useDispatch()
   const menuState = useSelector(state => state.menu)
   const [state, updateState] = useState({})
   const [refreshing, setRefreshing] = useState(false)

   const {
    menus,
    success,
    failure,
    menuLoader,
    refreshF,
    menuText,
    loaderId,
    placeOrderLoader
   } = menuState

 console.log('sucess', success)

 useEffect(() => {
  if( success || failure ) {
    console.log('booooo') 
    dispatch(getMenuInitiate())  
  } 
},[success, failure])

  useEffect(() => {
    setRefreshing(false)
  },[refreshF])

  useEffect(() => {
    dispatch(getMenuInitiate())   
  }, []) 
 


  // useEffect(() => {
  //   if(menuText.length > 0) {
  //      setTimeout(() => dispatch(menuToasterRemove()), 3000)
  //   } 
  // }, [menuText])
    
  const incrementDecrement = (action, id) => {
    let clonedState = cloneDeep(state)
    if(action === 'inc') {
      clonedState[id] = clonedState[id] + 1
    }
    if(action === 'dec') {
      clonedState[id] = clonedState[id] - 1
    }
    if (clonedState[id] <= 0) {
      clonedState[id] = 1
    }
    updateState({...clonedState})
  } 

  const initialVal = (id) => {
    let clonedState = cloneDeep(state)
    clonedState[id] = 1
    updateState({...clonedState})
  }

  const quantityView = (id) => {
      return (
        <IncrementDecrementView>
            <StyledText color="grey" size={16}>
              quantity
            </StyledText>
            <IncrementDecrementActions>
                <FontAwesomeIcon onPress={() => incrementDecrement('dec',id)} icon="minus-square" size={23} color='black'/>
                <StyledText>
                {
                  !state[id] ? initialVal(id) : state[id]
                }
                </StyledText>
                <FontAwesomeIcon onPress={() => incrementDecrement('inc',id)} icon="plus-square" size={23} color='black'/>
            </IncrementDecrementActions>
        </IncrementDecrementView>
      )
  }

  const orderDetails = (order) => {
    let obj = {}
     obj.name = order.dishName
     obj.price = order.price
     obj['Serve Time'] = order.serveTime
     
     return Object.keys(obj).map(data => {
       return (
          <DetailContent>
            <DetailKey width={28}>
              <StyledText color="grey" size={16}>
                {data} :
              </StyledText>
            </DetailKey>
            <DetailKey bb width={72}>
            <StyledText>
               {obj[data]}
            </StyledText>
            </DetailKey>
          </DetailContent>
       )
     })
  }
    return (  
      <Wrapper>
         {/* {
         menuText.length > 0 && 
        <Toaster message={menuText} type={failure ? 'error' : 'success'}/>
         } */}
        <Header>
          <StyledText size={18}>
             Menu Today
          </StyledText>
        </Header> 
         { menuLoader ? <LoaderWrap><Loader color="black" size={12}/></LoaderWrap>
         :
          <MenuWrapper
            refreshControl = {
              <StyledRefreshControl refreshing={refreshing} onRefresh={() => {
                dispatch(getMenuInitiate())
                setRefreshing(true)
              }} />
            } 
          >
          {
            menus.length > 0 ? menus.map(menu => {
              return (
                <OrderWrapper>
                <OrgInfo>
                <StyledText size={18} color='#f5ce00'>
                    {menu.createdByName}
                </StyledText>
                <StyledImage source={require(`../../../static/av5.png`)} />
                </OrgInfo>
                <OrderContent>
                <StyledText mLeft size={18} bottom={10}>
                    Order Details
                </StyledText>
                <DetailWrap>
                  <Details>
                  {
                    orderDetails(menu) 
                  }
                  </Details>
                  
                <QuantityAndButton>
                  {
                    quantityView(menu._id)
                  }
                <OrderButtom onPress={() => !placeOrderLoader && dispatch(placeOrderInitiate({dishId: menu._id, action:"order", quantity: state[menu._id]}))}>
                    { placeOrderLoader && loaderId === menu._id ?
                      <Loader color="white" size={12}/>
                    : 
                    <StyledText size={22} weight={600} color="white">
                      Place Order
                    </StyledText>
                    }
                </OrderButtom>
                </QuantityAndButton>
                </DetailWrap>
                </OrderContent>
                </OrderWrapper>
              )
            })
            : <NoMenu><StyledText color="grey" size={20}>No Menu found</StyledText></NoMenu>
          }
        </MenuWrapper>
         }
      </Wrapper>
    );
  }

  export default MenuToday