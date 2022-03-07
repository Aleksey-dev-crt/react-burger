import { useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
//import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
//import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
//import Loader from '../Auxiliary/Loader/Loader'
//import AppStyles from './App.module.css'
import { useDispatch } from 'react-redux'
import { requestIngredients, requestUserData } from '../../services/actions'
//import { DndProvider } from 'react-dnd'
//import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage, Login, OrderFeed, Orders, Register, ForgotPassword, ResetPassword, Profile, NotFoundPage } from '../../pages'
import { getCookie } from '../../utils/cookies'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestIngredients())
  }, [dispatch])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if(accessToken) dispatch(requestUserData(accessToken))
  }, [dispatch])

  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/react-burger" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <Orders />
        </Route>
        <Route path="/orderFeed" exact={true}>
          <OrderFeed />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
