import React from 'react'
import { data } from '../../utils/data'
import PropTypes from 'prop-types'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const Tabs = () => {
  const [current, setCurrent] = React.useState('bun')

  return (
    <div style={{ display: 'flex' }}>
      <a style={{ all: 'unset' }} href="#bun">
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a style={{ all: 'unset' }} href="#sauce">
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a style={{ all: 'unset' }} href="#main">
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  )
}

const Count = (props) => {
  if (props.show) {
    return <Counter count={props.children} size="default" />
  } else return null
}

const Ingridient = (props) => {
  return (
    <li className={'mt-6 ' + BurgerIngredientsStyles.ingridient}>
      <img className="ml-4 mr-4" src={props.ingridient.image} alt={props.ingridient.name} />
      <div className={BurgerIngredientsStyles.price}>
        <p className="text text_type_digits-default">{props.ingridient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default" style={{ textAlign: 'center' }}>
        {props.ingridient.name}
      </p>
      <Count show={props.ingridient.__v > 0}>{props.ingridient.__v}</Count>
    </li>
  )
}

const IngridientsCategory = (props) => {
  const category = data.filter((el) => el.type == props.type)
  return (
    <li id={props.type}>
      <h2 className="text text_type_main-medium">{props.text}</h2>
      <ul className={'pl-4 ' + BurgerIngredientsStyles.ingridients}>
        {category.map((el, i) => (
          <Ingridient key={i} ingridient={el} />
        ))}
      </ul>
    </li>
  )
}

Ingridient.propTypes = {
  ingridient: PropTypes.object.isRequired,
}

IngridientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

function BurgerIngredients() {
  const categories = [
    { type: 'bun', text: 'Булки' },
    { type: 'sauce', text: 'Соусы' },
    { type: 'main', text: 'Начинки' },
  ]

  return (
    <section className={BurgerIngredientsStyles.burgerIngredients}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <ul className={'mt-10 ' + BurgerIngredientsStyles.container}>
        {categories.map((el, i) => (
          <IngridientsCategory key={i} type={el.type} text={el.text} />
        ))}
      </ul>
    </section>
  )
}

export default BurgerIngredients
