import { useEffect } from 'react'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { Profile } from '../profile/profile'
import { useDispatch } from 'react-redux'
import { requestIngredients, requestUserData } from '../../../services/actions'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import {
  HomePage,
  Login,
  Feed,
  HistoryOrders,
  ProfileForm,
  Register,
  ForgotPassword,
  ResetPassword,
  IngredientDetails,
  OrderDetails,
} from '../../../pages'
import { getCookie } from '../../../utils/cookies'
import Modal from '../../Modals/Modal/Modal'

export function Routes() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  let background = location.state && location.state.background

  useEffect(() => {
    dispatch(requestIngredients())
    const refreshToken = getCookie('refreshToken')
    if (refreshToken) dispatch(requestUserData(refreshToken))
  }, [dispatch, location])

  const back = () => {
    history.goBack()
  }

  return (
    <>
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
          <Profile>
            <ProfileForm />
          </Profile>
        </ProtectedRoute>
        <Route path="/profile/orders" exact={true}>
          <Profile>
            <HistoryOrders />
          </Profile>
        </Route>
        <Route path="/profile/orders/:id" exact={true}>
          <OrderDetails />
        </Route>
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <OrderDetails />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>

        <Redirect to="/react-burger" />
      </Switch>
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={back}>
            <OrderDetails modal={true} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal onClose={back}>
            <OrderDetails modal={true} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={back}>
            <IngredientDetails modal={true} />
          </Modal>
        </Route>
      )}
    </>
  )
}
