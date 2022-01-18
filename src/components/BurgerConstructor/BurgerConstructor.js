import PropTypes from 'prop-types'
import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
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


function BurgerConstructor({ ingredients }) {  
  
  const nonBunsIngredients = ingredients.filter((el) => el.type !== 'bun')
  const cost = nonBunsIngredients.reduce((acc, el) => (acc += el.price), 0) + 2510

  return (
    <section className={'pt-25 ' + burgerConstructorStyle.constructor}>
      <div className={burgerConstructorStyle.container}>
        <div className={'pl-7 ' + burgerConstructorStyle.element}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text='Краторная булка N-200i'
            price={1255}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
        <Ingridients ingredients={nonBunsIngredients} />
        <div className={'pl-7 ' + burgerConstructorStyle.element}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text='Краторная булка N-200i'
            price={1255}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          />
        </div>
      </div>
      <PlaceOrder cost={cost} />
    </section>
  )
}

export default BurgerConstructor
