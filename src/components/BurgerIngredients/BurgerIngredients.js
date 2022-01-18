import React from 'react'
import PropTypes from 'prop-types'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const Tabs = () => {
  const [current, setCurrent] = React.useState('bun')

  const setTab = (tab) => {
    setCurrent(tab)
    const element = document.getElementById(tab)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={() => setTab('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => setTab('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => setTab('main')}>
          Начинки
        </Tab>
    </div>
  )
}

const Count = (props) => {
  if (props.show) {
    return <Counter count={props.children} size="default" />
  } else return null
}

const Ingredient = (props) => {
  return (
    <li className={'mt-6 ' + BurgerIngredientsStyles.ingredient}>
      <img className="ml-4 mr-4" src={props.ingredient.image} alt={props.ingredient.name} />
      <div className={BurgerIngredientsStyles.price}>
        <p className="text text_type_digits-default">{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default" style={{ textAlign: 'center' }}>
        {props.ingredient.name}
      </p>
      <Count show={props.ingredient.__v > 0}>{props.ingredient.__v}</Count>
    </li>
  )
}

const IngredientsCategory = (props) => {
  const category = props.ingredients.filter((el) => el.type === props.type)

  return (
    <li id={props.type}>
      <h2 className="text text_type_main-medium">{props.text}</h2>
      <ul className={'pl-4 ' + BurgerIngredientsStyles.ingredients}>
        {category.map((el, i) => (
          <Ingredient key={i} ingredient={el} />
        ))}
      </ul>
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
}

IngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

function BurgerIngredients({ ingredients }) {
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
          <IngredientsCategory key={i} type={el.type} text={el.text} ingredients={ingredients} />
        ))}
      </ul>
    </section>
  )
}

export default BurgerIngredients
