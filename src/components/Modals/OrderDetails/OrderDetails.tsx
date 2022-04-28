import { FC } from 'react'
import OrderDetailsStyles from './OrderDetails.module.css'
import done from '../../../images/done.svg'

interface IOrderDetailsProps {
  orderNumber: string | null
}

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={OrderDetailsStyles.container}>
      <h2 className={'text text_type_digits-large pt-20 pb-8'}>{orderNumber}</h2>
      <h3 className={'text text_type_main-medium'}>
        идентификатор заказа
      </h3>
      <img className="pt-15 pb-15" src={done} alt="Заказ принят" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-20 pt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails
