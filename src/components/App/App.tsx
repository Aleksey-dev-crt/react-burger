import { useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Loader from '../Auxiliary/Loader/Loader'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestIngredients } from '../../services/actions'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";




function App() { 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestIngredients())
  }, [dispatch])

  const loading = useSelector(store => (store as any).commonReducer.loadingOnReguestIngredients)

  return (
      <div className="App">
        <AppHeader />
        <main className="content">
          {loading ? (
            <Loader />
          ) : (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </main>
      </div>
  )
}

export default App
