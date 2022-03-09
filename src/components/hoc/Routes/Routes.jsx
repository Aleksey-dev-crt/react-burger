import { useEffect } from 'react'
import { ProtectProfile } from '../ProtectProfile/ProtectProfile'
import { ProtectResetPassword } from '../ProtectResetPassword/ProtectResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { requestIngredients, requestUserData } from '../../../services/actions'
import { Switch, Route, Redirect } from 'react-router-dom'
import {
  HomePage,
  Login,
  OrderFeed,
  Orders,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  IngredientDetails
} from '../../../pages'
import { getCookie } from '../../../utils/cookies'

export function Routes() {
  const dispatch = useDispatch()
  const { authorized } = useSelector((store) => store.registrationReducer)

  useEffect(() => {
    dispatch(requestIngredients())
    const refreshToken = getCookie('refreshToken')
    if (refreshToken) dispatch(requestUserData(refreshToken))
  }, [dispatch])

  let routes = (
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
      <ProtectResetPassword path="/reset-password" exact={true}>
        <ResetPassword />
      </ProtectResetPassword>
      <ProtectProfile path="/profile" exact={true}>
        <Profile />
      </ProtectProfile>
      <Route path="/profile/orders" exact={true}>
        <Orders />
      </Route>
      <Route path="/orderFeed" exact={true}>
        <OrderFeed />
      </Route>
      <Route path="/ingredients/:id" exact={true}>
        <IngredientDetails />
      </Route>

      <Redirect to="/react-burger" />
    </Switch>
  )

  if (authorized) {
    routes = (
      <Switch>
        <Route path="/react-burger" exact={true}>
          <HomePage />
        </Route>
        <ProtectProfile path="/profile" exact={true}>
          <Profile />
        </ProtectProfile>
        <Route path="/profile/orders" exact={true}>
          <Orders />
        </Route>
        <Route path="/orderFeed" exact={true}>
          <OrderFeed />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>

        <Redirect to="/react-burger" />
      </Switch>
    )
  }

  return <>{routes}</>
}
