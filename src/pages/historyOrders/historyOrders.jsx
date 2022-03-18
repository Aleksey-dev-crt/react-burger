import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WS_CONNECTION_USER_START, WS_CONNECTION_CLOSED } from '../../services/actions/wsActionTypes'
import { Orders } from '../../components/Orders/Orders'

export function HistoryOrders() {
    const dispatch = useDispatch()
    const { token } = useSelector((store) => store.registrationReducer)
    const { messages } = useSelector((store) => store.wsReducer) 
    
    let ordersInfo = {orders: [], total: 0, totalToday: 0}
    if (messages.orders) {
      ordersInfo.orders = messages.orders
      ordersInfo.total = messages.total
      ordersInfo.totalToday = messages.totalToday
    } 

    useEffect(() => {
        if (token) dispatch({ type: WS_CONNECTION_USER_START })
        return () => {
          dispatch({ type: WS_CONNECTION_CLOSED })
        }
      }, [dispatch, token])

    return ( 
      <Orders orders={ordersInfo.orders} historyOrders={true} />
    )
  }