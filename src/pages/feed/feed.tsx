import FeedStyles from './feed.module.css'
import Loader from '../../components/Auxiliary/Loader/Loader'
import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Orders } from '../../components/Orders/Orders'
import { IOrdersInfo } from '../../utils/types'
import { OrdersDescription } from '../../components/OrdersDescription/OrdersDescription'
import {
  wsConnectionOpen,
  wsConnectionClose,
} from '../../services/actions/wsActions'

export const Feed: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wsConnectionOpen())
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
    <section className={FeedStyles.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      {!ordersInfo.orders.length ? (
        <Loader />
      ) : (
        <div className={'mt-10 ' + FeedStyles.container}>
          <Orders orders={ordersInfo.orders} />
          <OrdersDescription ordersInfo={ordersInfo} />
        </div>
      )}
    </section>
  )
}