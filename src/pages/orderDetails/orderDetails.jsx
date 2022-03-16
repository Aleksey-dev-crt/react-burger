import OrderDetailsStyles from './orderDetails.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IngredientDescription = ({ ingredient }) => {
  return (
    <li className={OrderDetailsStyles.description__item}>
      <img className={OrderDetailsStyles.image} src={ingredient.image} alt={ingredient.name} />
      <p className={'text text_type_main-default ml-4 ' + OrderDetailsStyles.ingredientName}>
        {ingredient.name}
      </p>
      <span className={'text text_type_digits-default ml-4 '}>
        {`${ingredient.orderCount} x ${ingredient.price}`}
      </span>
    </li>
  )
}

export function OrderDetails({ modal }) {
  const params = useParams()
  const { modifyedIngredients } = useSelector((store) => store.constructorReducer)
  const { messages } = useSelector((store) => store.wsReducer)
  let order = {ingredients: []}

  if (messages.orders) {
    order = messages.orders.find((el) => el._id === params.id)    
  }
  
  const date = new Date(order.createdAt).toLocaleString()

  const ingredientsObj =
    order.ingredients.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})

  const ingredients = []
  let ingredientsPrice = 0
  Object.keys(ingredientsObj).forEach((element) => {
    const ingredient = modifyedIngredients.find((el) => el._id === element)
    if (ingredient) {
      ingredients.push(ingredient)
      ingredient.orderCount = ingredientsObj[element]
      ingredientsPrice += ingredient.price
    }
  })

  return (
    <div className={modal ? OrderDetailsStyles.container_modal : OrderDetailsStyles.container}>
      <h2 className={'text text_type_digits-default pt-3 ' + OrderDetailsStyles.number}>
        {'#' + `${order.number}`.padStart(6, '0')}
      </h2>
      <h3 className={'text text_type_main-medium pt-10 ' + OrderDetailsStyles.title}>{order.name}</h3>
      <span className={'text text_type_main-default pt-3 ' + OrderDetailsStyles.status}>
        выполнен
      </span>
      <h3 className={'text text_type_main-medium pt-15 pb-6 ' + OrderDetailsStyles.title}>Состав:</h3>
      <ul className={OrderDetailsStyles.description}>
        {ingredients.map((el, i) => (
          <IngredientDescription key={i} ingredient={el} />
        ))}
      </ul>
      <div className={'text text_type_main-default pt-10 ' + OrderDetailsStyles.total}>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
        <div className={OrderDetailsStyles.price}>
          <p className="text text_type_digits-default">{ingredientsPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
