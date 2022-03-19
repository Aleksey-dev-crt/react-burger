import PropTypes from 'prop-types'
import OrdersStyles from './Orders.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { typeOfOrder } from '../../utils/propTypes'

const Order = ({ order, historyOrders }) => {
  const { modifyedIngredients } = useSelector((store) => store.constructorReducer)
  const location = useLocation()
  const date = new Date(order.createdAt).toLocaleString()
  const ingredients = []
  let ingredientsPrice = 0
  let path = '/feed'
  order.ingredients.forEach((element) => {
    const ingredient = modifyedIngredients.find((el) => el._id === element)
    if (ingredient) {
      ingredients.push(ingredient)
      ingredientsPrice += ingredient.price
    }
  })

  const status = {
    done: 'Выполнен',
    created: 'Создан',
    pending: 'Готовится',
  }

  if (historyOrders) path = '/profile/orders'

  return (
    <Link
      className={OrdersStyles.order}
      key={order._id}
      to={{
        pathname: `${path}/${order._id}`,
        state: { background: location },
      }}
    >
      <div className={OrdersStyles.orderNumber}>
        <p className="text text_type_digits-default">{'#' + `${order.number}`.padStart(6, '0')}</p>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
      </div>
      <div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {historyOrders ? (
          <p
            className="text text_type_digits-small mt-2"
            style={{ color: order.status === 'done' ? '#00CCCC' : '#F2F2F3' }}
          >
            {status[order.status]}
          </p>
        ) : null}
      </div>
      <div className={OrdersStyles.orderDescription}>
        <div className={OrdersStyles.ingredient}>
          {ingredients.map((el, i, arr) => (
            <img style={{ zIndex: `${arr.length - i}` }} key={i} src={el.image} alt={el.name} />
          ))}
        </div>
        <div className={OrdersStyles.price}>
          <p className="text text_type_digits-default">{ingredientsPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}

export function Orders({ orders, historyOrders }) {
  return (
    <ul className={'mt-10 ' + OrdersStyles.ordersContainer}>
      {orders.map((el) => (
        <Order key={el._id} order={el} historyOrders={historyOrders} />
      ))}
    </ul>
  )
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape(typeOfOrder).isRequired).isRequired,
  historyOrders: PropTypes.bool,
}

Order.propTypes = {
  order: PropTypes.shape(typeOfOrder).isRequired,
  historyOrders: PropTypes.bool,
}
