import { useState, useEffect } from 'react'
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import './App.css'
import { getData } from './utils/Api'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className="content">
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />       
      </main>
    </div>
  )
}

export default App
