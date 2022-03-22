import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HistoryOrdersStyles from './historyOrders.module.css'
import { Orders } from '../../components/Orders/Orders'
import { wsConnectionAuthOpen, wsConnectionClose } from '../../services/actions/wsActions'

export function HistoryOrders() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnectionAuthOpen())
    return () => {
      dispatch(wsConnectionClose())
    }
  }, [dispatch])

  const { messages } = useSelector((store) => store.wsReducer)

  let ordersInfo = { orders: [], total: 0, totalToday: 0 }
  if (messages.orders) {
    ordersInfo.orders = messages.orders
    ordersInfo.total = messages.total
    ordersInfo.totalToday = messages.totalToday
  }  

  return (
    <section className={HistoryOrdersStyles.section}>
      <Orders orders={ordersInfo.orders} historyOrders={true} />
    </section>
  )
}
