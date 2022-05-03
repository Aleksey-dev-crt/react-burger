import FeedStyles from './feed.module.css'
import Loader from '../../components/Auxiliary/Loader/Loader'
import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import { Orders } from '../../components/Orders/Orders'
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

  const { messages } = useSelector((store) => store.wsReducer)

  return (
    <section className={FeedStyles.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      {!messages.orders.length ? (
        <Loader />
      ) : (
        <div className={'mt-10 ' + FeedStyles.container}>
          <Orders orders={messages.orders} />
          <OrdersDescription ordersInfo={messages} />
        </div>
      )}
    </section>
  )
}
