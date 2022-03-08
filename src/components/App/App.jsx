import { useEffect } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
//import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
//import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
//import Loader from '../Auxiliary/Loader/Loader'
//import AppStyles from './App.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestIngredients, requestUserData } from '../../services/actions'
//import { DndProvider } from 'react-dnd'
//import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {
  HomePage,
  Login,
  OrderFeed,
  Orders,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,  
} from '../../pages'
import { getCookie } from '../../utils/cookies'

function App() {
  const dispatch = useDispatch()
  const { authorized } = useSelector((store) => store.registrationReducer)

  useEffect(() => {
    dispatch(requestIngredients())
  }, [dispatch])

  useEffect(() => {
    const refreshToken = getCookie('refreshToken')
    if (refreshToken) {
      dispatch(requestUserData(refreshToken))
    }
  }, [dispatch])

  let routes

  if (authorized) {
    routes = (
      <Switch>
        <Route path="/react-burger" exact={true}>
          <HomePage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <Profile />
        </ProtectedRoute>
        <Route path="/profile/orders" exact={true}>
          <Orders />
        </Route>
        <Route path="/orderFeed" exact={true}>
          <OrderFeed />
        </Route>

        <Redirect to="/react-burger" />
      </Switch>
    )
  } else {
    routes = (
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
      <ProtectedRoute path="/profile" exact={true}>
        <Profile />
      </ProtectedRoute>
      <Route path="/profile/orders" exact={true}>
        <Orders />
      </Route>
      <Route path="/orderFeed" exact={true}>
        <OrderFeed />
      </Route>

      <Redirect to="/react-burger" />
    </Switch>
    )
  }

  return (
    <Router>
      <AppHeader />
      {routes}
    </Router>
  )
}

export default App
