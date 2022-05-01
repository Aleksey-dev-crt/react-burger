import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HistoryOrdersStyles from './historyOrders.module.css'
import { Orders } from '../../components/Orders/Orders'
import { IOrdersInfo } from '../../services/types/types'
import { wsConnectionAuthOpen, wsConnectionClose } from '../../services/actions/wsActions'

export const HistoryOrders: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnectionAuthOpen())
    return () => {
      dispatch(wsConnectionClose())
    }
  }, [dispatch])

  const { messages } = useSelector((store: any) => store.wsReducer)

  let ordersInfo: IOrdersInfo = { orders: [], total: 0, totalToday: 0 }
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
