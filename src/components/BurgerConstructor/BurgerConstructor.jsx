import { useState, useCallback, useMemo, useEffect, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import currencyIcon from '../../images/currencyIcon.svg'
import Modal from '../Modals/Modal/Modal'
import OrderDetails from '../Modals/OrderDetails/OrderDetails'
import typeOfIngredient from '../../utils/propTypes'
import { IngredientsContext } from '../../services/appContext'
import { placeOrder } from '../../utils/Api'
import Loader from '../Auxiliary/Loader/Loader'
import ModalOverlay from '../Modals/ModalOverlay/ModalOverlay'

const Ingredients = ({ ingredients }) => {
  return (
    <ul className={BurgerConstructorStyles.ingredients}>
      {ingredients.map((el) => (
        <li className={BurgerConstructorStyles.element} key={el._id}>
          <div className={BurgerConstructorStyles.dragIcon}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text={el.name} price={el.price} thumbnail={el.image} />
        </li>
      ))}
    </ul>
  )
}

const Order = ({ cost, ingredientsIds }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState()
  const [loading, setLoading] = useState(false)

  const modalOpenHandler = useCallback(() => {
    setLoading(true)
    placeOrder(ingredientsIds)
      .then((res) => setOrderDetails(res))
      .then(() => setModalOpen(true))
      .finally(() => setLoading(false))
      .catch((err) => console.log(err))
  }, [ingredientsIds])

  const modalCloseHandler = useCallback(() => setModalOpen(false), [])

  return (
    <div className={'mr-4 mt-10 ' + BurgerConstructorStyles.order}>
      <div className={BurgerConstructorStyles.price}>
        <p className="text text_type_digits-medium">{cost}</p>
        <img src={currencyIcon} alt="Значок валюты" />
      </div>
      <Button type="primary" size="large" onClick={modalOpenHandler}>
        Оформить заказ
      </Button>
      {loading ? (
        <ModalOverlay>
          <Loader />
        </ModalOverlay>
      ) : (
        isModalOpen && (
          <Modal onClose={modalCloseHandler}>
            <OrderDetails orderNumber={`${orderDetails.order.number}`.padStart(6, '0')} />
          </Modal>
        )
      )}
    </div>
  )
}

const priceInitialState = { price: 0 }
function reducer(state, action) {
  switch (action.type) {
    case 'calculate':
      return {
        price: action.nonBuns.reduce((acc, el) => (acc += el.price), 0) + action.buns.price * 2,
      }
    default:
      throw new Error(`Wrong type of action: ${action.type}`)
  }
}

function BurgerConstructor() {
  const ingredients = useContext(IngredientsContext)
  const [priceState, priceDispatcher] = useReducer(reducer, priceInitialState)

  const [buns, nonBuns] = useMemo(
    () =>
      ingredients.reduce(
        (acc, el) => (el.type === 'bun' ? [[...acc[0], el], acc[1]] : [acc[0], [...acc[1], el]]),
        [[], []]
      ),
    [ingredients]
  )

  const ingredientsIds = useMemo(() => ingredients.map((e) => e._id), [ingredients])

  useEffect(() => {
    priceDispatcher({ type: 'calculate', nonBuns: nonBuns, buns: buns[0] })
  }, [nonBuns, buns])

  return (
    <section className={'pt-25 ' + BurgerConstructorStyles.constructor}>
      <div className={BurgerConstructorStyles.container}>
        <div className={'pl-7 ' + BurgerConstructorStyles.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns[0].name} (верх)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
        <Ingredients ingredients={nonBuns} />
        <div className={'pl-7 ' + BurgerConstructorStyles.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns[0].name} (низ)`}
            price={buns[0].price}
            thumbnail={buns[0].image}
          />
        </div>
      </div>
      <Order ingredientsIds={ingredientsIds} cost={priceState.price} />
    </section>
  )
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient)).isRequired,
}

Order.propTypes = {
  cost: PropTypes.number.isRequired,
  ingredientsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient)).isRequired,
// }

export default BurgerConstructor
