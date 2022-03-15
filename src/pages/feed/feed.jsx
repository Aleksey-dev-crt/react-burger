import PropTypes from 'prop-types'
import FeedStyles from './feed.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Order = ({ order }) => {
  const { modifyedIngredients } = useSelector((store) => store.constructorReducer)
  let location = useLocation()
  const date = new Date(order.createdAt).toLocaleString()
  const ingredients = []
  let ingredientsPrice = 0
  order.ingredients.forEach((element) => {
    const ingredient = modifyedIngredients.find((el) => el._id === element)
    if (ingredient) {
      ingredients.push(ingredient)
      ingredientsPrice += ingredient.price
    }
  })

  return (
    <>
      <Link className={FeedStyles.order} key={order._id} to="/">
        <div className={FeedStyles.orderNumber}>
          <p className="text text_type_digits-default">
            {'#' + `${order.number}`.padStart(6, '0')}
          </p>
          <p className="text text_type_main-default text_color_inactive">{date}</p>
        </div>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        <div className={FeedStyles.orderDescription}>
          <div className={FeedStyles.ingredient}>
            {ingredients.map((el, i, arr) => (
              <img style={{ zIndex: `${arr.length - i}` }} key={i} src={el.image} alt={el.name} />
            ))}
          </div>
          <div className={FeedStyles.price}>
            <p className="text text_type_digits-default">{ingredientsPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </>
  )
}

export function Feed() {
  const { messages } = useSelector((store) => store.wsReducer)

  return (
    <section className={FeedStyles.section}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Лента заказов</h1>
      <div className={'mt-10 ' + FeedStyles.container}>
        <ul className={'mt-10 ' + FeedStyles.ordersContainer}>
          {messages.orders ? messages.orders.map((el) => <Order key={el._id} order={el} />) : null}
        </ul>
        <div className={'mt-10 ' + FeedStyles.descriptionContainer}>
          <div className={FeedStyles.statuses}>
            <div className='mr-9' >
              <h2 className="mb-6 text text_type_main-medium">Готовы:</h2>
              <ul className={FeedStyles.list}>
                {messages.orders
                  ? messages.orders.map((el) =>
                      el.status === 'done' ? (
                        <li key={el._id} className={"text text_type_digits-default " + FeedStyles.list__element}>
                          {`${el.number}`.padStart(6, '0')}
                        </li>
                      ) : null
                    )
                  : null}
              </ul>
            </div>
            <div className='mr-9'>
              <h2 className="mb-6 text text_type_main-medium">В работе:</h2>
              <ul className={FeedStyles.list}>
                {messages.orders
                  ? messages.orders.map((el) =>
                      el.status !== 'done' ? (
                        <li key={el._id} className="text text_type_digits-default">
                          {`${el.number}`.padStart(6, '0')}
                        </li>
                      ) : null
                    )
                  : null}
              </ul>
            </div>
          </div>
          <div className={FeedStyles.total}>
            <h2 className="mt-15 text text_type_main-medium">Выполнено за все время:</h2>
            <p className={"text text_type_digits-large " + FeedStyles.total__text}>{messages.total}</p>
          </div>
          <div className={FeedStyles.total}>
            <h2 className="mt-15 text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={"text text_type_digits-large " + FeedStyles.total__text}>{messages.totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
