import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Loader from '../Auxiliary/Loader/Loader'
import './App.css'
import { getIngredients } from '../../utils/Api'
import { ingredientsContext } from '../../services/appContext'


function App() {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getIngredients()
      .then((res) => setIngredients(res.data))
      .finally(() => setLoading(false))
      .catch((err) => console.log(err))
  }, [])

  return (
    <ingredientsContext.Provider value={ingredients}>
      <div className="App">
        <AppHeader />
        <main className="content">
          {loading ? (
            <Loader />
          ) : (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </div>
    </ingredientsContext.Provider>
  )
}

export default App
