import { useRef, FC } from 'react'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient, ILocationState } from '../../services/types/types'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../../services/actions'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'

interface ITabsProps {
  currentCategory: string
  bun: string
  sauce: string
  main: string
}

const Tabs: FC<ITabsProps> = ({ currentCategory, bun, sauce, main }) => {
  const setTab = (tab: string) => {
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

interface ICountProps {
  children: number
}

const Count: FC<ICountProps> = ({ children }) =>
  children ? <Counter count={children} size="default" /> : null

interface IIngredientProps {
  ingredient: IIngredient
}

const Ingredient: FC<IIngredientProps> = ({ ingredient }) => {
  let location = useLocation<ILocationState>()

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }))

  return (
    <>
      <Link
        className={'mt-6 ' + BurgerIngredientsStyles.ingredient}
        key={ingredient._id}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
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
        <Count>{ingredient.count}</Count>
      </Link>
    </>
  )
}

interface IIngredientsCategoryProps {
  ingredients: ReadonlyArray<IIngredient>
  type: string
  text: string
}

const IngredientsCategory: FC<IIngredientsCategoryProps> = ({ ingredients, type, text }) => {
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

const BurgerIngredients: FC = () => {
  const dispatch = useDispatch()
  const { category } = useSelector((store: any) => store.ingredientsReducer)
  const { modifyedIngredients } = useSelector((store: any) => store.constructorReducer)

  const refContainer = useRef<HTMLUListElement>(null)

  const categories = [
    { type: 'bun', name: 'Булки' },
    { type: 'sauce', name: 'Соусы' },
    { type: 'main', name: 'Начинки' },
  ]

  const onScroll = () => {
    const bunCategory: HTMLElement | null = document.querySelector('#bun')
    const sauceCategory: HTMLElement | null = document.querySelector('#sauce')
    const mainCategory: HTMLElement | null = document.querySelector('#main')
    const scrollTop = refContainer.current!.scrollTop
    if (scrollTop <= bunCategory!.offsetTop) dispatch(setCategory('bun'))
    if (scrollTop >= sauceCategory!.offsetTop - bunCategory!.offsetTop - 50)
      dispatch(setCategory('sauce'))
    if (scrollTop >= mainCategory!.offsetTop - bunCategory!.offsetTop - 50)
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

export default BurgerIngredients
