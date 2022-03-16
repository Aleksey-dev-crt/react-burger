import PropTypes from 'prop-types'
import OrdersDescriptionStyles from './OrdersDescription.module.css'
import { typeOfOrder } from '../../utils/propTypes'

export function OrdersDescription({ ordersInfo }) {
  return (
    <div className={'mt-10 ' + OrdersDescriptionStyles.descriptionContainer}>
      <div className={OrdersDescriptionStyles.statuses}>
        <div className="mr-9">
          <h2 className="mb-6 text text_type_main-medium">Готовы:</h2>
          <ul className={OrdersDescriptionStyles.list}>
            {ordersInfo.orders.map((el) =>
              el.status === 'done' ? (
                <li
                  key={el._id}
                  className={'text text_type_digits-default ' + OrdersDescriptionStyles.list__element}
                >
                  {`${el.number}`.padStart(6, '0')}
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="mr-9">
          <h2 className="mb-6 text text_type_main-medium">В работе:</h2>
          <ul className={OrdersDescriptionStyles.list}>
            {ordersInfo.orders.map((el) =>
              el.status !== 'done' ? (
                <li key={el._id} className="text text_type_digits-default">
                  {`${el.number}`.padStart(6, '0')}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
      <div className={OrdersDescriptionStyles.total}>
        <h2 className="mt-15 text text_type_main-medium">Выполнено за все время:</h2>
        <p className={'text text_type_digits-large ' + OrdersDescriptionStyles.total__text}>{ordersInfo.total}</p>
      </div>
      <div className={OrdersDescriptionStyles.total}>
        <h2 className="mt-15 text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={'text text_type_digits-large ' + OrdersDescriptionStyles.total__text}>
          {ordersInfo.totalToday}
        </p>
      </div>
    </div>
  )
}

OrdersDescription.propTypes = {
  ordersInfo: PropTypes.shape({
    orders: PropTypes.arrayOf(PropTypes.shape(typeOfOrder).isRequired),
    total: PropTypes.number.isRequired,
    totalToday: PropTypes.number.isRequired
  })
}
