import { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modals/Modal/Modal'
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails'
import typeOfIngredient from '../../utils/propTypes'
import { IngredientsContext } from '../../services/appContext'

const Tabs = () => {
  const [current, setCurrent] = useState('bun')

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

const Count = ({show, children}) => {
  if (show) {
    return <Counter count={children} size="default" />
  } else return null
}

const Ingredient = ({ ingredient }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const modalOpenHandler = useCallback(
    () => setModalOpen(true),
    []
  );

  const modalCloseHandler = useCallback(
    () => setModalOpen(false),
    []
  );

  return (
    <>
      <li className={'mt-6 ' + BurgerIngredientsStyles.ingredient} onClick={modalOpenHandler}>
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <div className={BurgerIngredientsStyles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default" style={{ textAlign: 'center' }}>
          {ingredient.name}
        </p>
        <Count show={ingredient.proteins > 0}>{ingredient.proteins}</Count>
      </li>
      {isModalOpen && (
        <Modal onClose={modalCloseHandler}>
          <IngredientDetails {...ingredient} />
        </Modal>
      )}
    </>
  )
}

const IngredientsCategory = (props) => {
  const category = props.ingredients.filter((el) => el.type === props.type)

  return (
    <li id={props.type}>
      <h2 className="text text_type_main-medium">{props.text}</h2>
      <ul className={'pl-4 ' + BurgerIngredientsStyles.ingredients}>
        {category.map((el) => (
          <Ingredient key={el._id} ingredient={el} />
        ))}
      </ul>
    </li>
  )
}

function BurgerIngredients() {
  const ingredients = useContext(IngredientsContext)

  const categories = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' },
  ]

  return (
    <section className={BurgerIngredientsStyles.burgerIngredients}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs />
      <ul className={'mt-10 ' + BurgerIngredientsStyles.container}>
        {categories.map((el) => (          
          <IngredientsCategory key={el.type} type={el.type} text={el.name} ingredients={ingredients} />
        ))}
      </ul>
    </section>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape(typeOfIngredient),
}

Count.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.number.isRequired,
}

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient)).isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

// BurgerIngredients.propTypes = {
//   ingredients:  PropTypes.arrayOf(PropTypes.shape(typeOfIngredient)).isRequired,
// }

export default BurgerIngredients
