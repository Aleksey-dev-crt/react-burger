import { useState, useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Loader from '../Loader/Loader'
import './App.css'
import { getData } from '../../utils/Api'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className="content">
        {loading ? (
          <Loader />
        ) : (
          <>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </>
        )}
      </main>
    </div>
  )
}

export default App
