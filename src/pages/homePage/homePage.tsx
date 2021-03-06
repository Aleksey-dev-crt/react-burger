import { FC } from 'react'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import Loader from '../../components/Auxiliary/Loader/Loader'
import { useSelector } from '../../utils/hooks'
import AppStyles from './homePage.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const HomePage: FC = () => {
  const loading = useSelector((store) => store.commonReducer.loadingWithoutOverlay)

  return loading ? (
    <Loader />
  ) : (
    <main className={AppStyles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}
