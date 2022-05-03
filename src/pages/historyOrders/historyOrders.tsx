import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from '../../utils/hooks'
import HistoryOrdersStyles from './historyOrders.module.css'
import { Orders } from '../../components/Orders/Orders'
import { wsConnectionAuthOpen, wsConnectionClose } from '../../services/actions/wsActions'
import { Redirect, useLocation } from 'react-router'
import { ILocation } from '../../services/types/types'

export const HistoryOrders: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation<ILocation>()
  
  useEffect(() => {
    dispatch(wsConnectionAuthOpen())
    return () => {
      dispatch(wsConnectionClose())
    }
  }, [dispatch])
  const { token } = useSelector((store) => store.registrationReducer)
  const { messages } = useSelector((store) => store.wsReducer)

  if (!token) return <Redirect to={location.state ? location.state.from : '/profile'} />  
  
  return (
    <section className={HistoryOrdersStyles.section}>
      <Orders orders={messages.orders} historyOrders={true} />
    </section>
  )
}
