import FeedStyles from './feed.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Orders } from '../../components/Orders/Orders'
import { OrdersDescription } from '../../components/OrdersDescription/OrdersDescription'
import { WS_CONNECTION_START } from '../../services/actions/wsActionTypes'

export function Feed() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })
  }, [dispatch])
  
  const { messages } = useSelector((store) => store.wsReducer)

  let ordersInfo = {orders: [], total: 0, totalToday: 0}
  if (messages.orders) {
    ordersInfo.orders = messages.orders
    ordersInfo.total = messages.total
    ordersInfo.totalToday = messages.totalToday
  } 

  return (
    <section className={FeedStyles.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div className={'mt-10 ' + FeedStyles.container}>
        <Orders orders={ordersInfo.orders} />
        <OrdersDescription ordersInfo={ordersInfo} />
      </div>
    </section>
  )
}
