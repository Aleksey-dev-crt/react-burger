import { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../Modals/Modal/Modal'
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails'
import typeOfIngredient from '../../utils/propTypes'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory, getIngredientDetails } from '../../services/actions'
import { useDrag } from 'react-dnd'

const Tabs = ({ currentCategory, bun, sauce, main }) => {
  const setTab = (tab) => {
    const element = document.getElementById(tab)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="bun" active={currentCategory === 'bun'} onClick={() => setTab(bun)}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentCategory === 'sauce'} onClick={() => setTab(sauce)}>
        Соусы
      </Tab>
      <Tab value="main" active={currentCategory === 'main'} onClick={() => setTab(main)}>
        Начинки
      </Tab>
    </div>
  )
}

const Count = ({ show, children }) => {
  if (show) {
    return <Counter count={children} size="default" />
  } else return null
}

const Ingredient = ({ ingredient }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  const modalOpenHandler = useCallback(() => {
    dispatch(getIngredientDetails(ingredient))
    setModalOpen(true)
    window.history.replaceState(null, '', `/ingredients/${ingredient._id}`)
  }, [dispatch, ingredient])

  const modalCloseHandler = useCallback(() => {
    setModalOpen(false)
    window.history.replaceState(null, '', '/react-burger')
  }, [])

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }))

  return (
    <>
      <li
        className={'mt-6 ' + BurgerIngredientsStyles.ingredient}
        onClick={modalOpenHandler}
        ref={drag}
      >
        <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name} />
        <div className={BurgerIngredientsStyles.price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default" style={{ textAlign: 'center' }}>
          {ingredient.name}
        </p>
        <Count show={ingredient.count > 0}>{ingredient.count}</Count>
      </li>
      {isModalOpen && (
        <Modal onClose={modalCloseHandler}>
          <IngredientDetails {...ingredient} />
        </Modal>
      )}
    </>
  )
}

const IngredientsCategory = ({ ingredients, type, text }) => {
  const category = ingredients.filter((el) => el.type === type)

  return (
    <li id={type}>
      <h2 className="text text_type_main-medium">{text}</h2>
      <ul className={'pl-4 ' + BurgerIngredientsStyles.ingredients}>
        {category.map((el) => (
          <Ingredient key={el._id} ingredient={el} />
        ))}
      </ul>
    </li>
  )
}

function BurgerIngredients() {
  const dispatch = useDispatch()
  const { category } = useSelector((store) => store.ingredientsReducer)
  const { modifyedIngredients } = useSelector((store) => store.constructorReducer)

  const refContainer = useRef()

  const categories = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' },
  ]

  const onScroll = () => {
    const bunCategory = document.querySelector('#bun')
    const sauceCategory = document.querySelector('#sauce')
    const mainCategory = document.querySelector('#main')
    const scrollTop = refContainer.current.scrollTop
    if (scrollTop <= bunCategory.offsetTop) dispatch(setCategory('bun'))
    if (scrollTop >= sauceCategory.offsetTop - bunCategory.offsetTop - 50)
      dispatch(setCategory('sauce'))
    if (scrollTop >= mainCategory.offsetTop - bunCategory.offsetTop - 50)
      dispatch(setCategory('main'))
  }

  return (
    <section className={BurgerIngredientsStyles.burgerIngredients}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <Tabs currentCategory={category} bun={'bun'} sauce={'sauce'} main={'main'} />
      <ul
        className={'mt-10 ' + BurgerIngredientsStyles.container}
        ref={refContainer}
        onScroll={onScroll}
      >
        {categories.map((el) => (
          <IngredientsCategory
            key={el.type}
            type={el.type}
            text={el.name}
            ingredients={modifyedIngredients}
          />
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
  children: PropTypes.node.isRequired,
}

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(typeOfIngredient).isRequired).isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default BurgerIngredients
