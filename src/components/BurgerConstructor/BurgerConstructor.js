import PropTypes from 'prop-types'
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'
import burgerConstructorStyle from './BurgerConstructor.module.css'
import currencyIcon from '../../images/currencyIcon.svg'

const Ingridients = (props) => {
  return (
    <ul className={burgerConstructorStyle.ingridients}>
      {props.ingredients.map((el, i) => (
        <li className={burgerConstructorStyle.element} key={i}>
          <div className={burgerConstructorStyle.dragIcon}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text={el.name} price={el.price} thumbnail={el.image} />
        </li>
      ))}
    </ul>
  )
}

const PlaceOrder = (props) => {
  return (
    <div className={'mr-4 mt-10 ' + burgerConstructorStyle.order}>
      <div className={burgerConstructorStyle.price}>
        <p className="text text_type_digits-medium">{props.cost}</p>
        <img src={currencyIcon} alt="Значок валюты" />
      </div>
      <Button type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

Ingridients.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

PlaceOrder.propTypes = {
  cost: PropTypes.number.isRequired,
}

function BurgerConstructor() {
  const ingredients = data.filter((el) => el.type != 'bun')
  const buns = data.filter((el) => el.type == 'bun')
  const cost = ingredients.reduce((acc, el) => (acc += el.price), 0) + buns[1].price * 2

  return (
    <section className={'pt-25 ' + burgerConstructorStyle.constructor}>
      <div className={burgerConstructorStyle.container}>
        <div className={'pl-7 ' + burgerConstructorStyle.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={buns[1].name}
            price={buns[1].price}
            thumbnail={buns[1].image}
          />
        </div>
        <Ingridients ingredients={ingredients} />
        <div className={'pl-7 ' + burgerConstructorStyle.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={buns[1].name}
            price={buns[1].price}
            thumbnail={buns[1].image}
          />
        </div>
      </div>
      <PlaceOrder cost={cost} />
    </section>
  )
}

export default BurgerConstructor
