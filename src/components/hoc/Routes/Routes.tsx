import { FC } from 'react'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { Profile } from '../profile/profile'
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
import Modal from '../../Modals/Modal/Modal'
import { ILocation } from '../../../services/types/types'

export const Routes: FC = () => {
  type TBackground = {
    hash: string
    key: string
    pathname: string
    search: string
    state: null
  }

  const location = useLocation<ILocation & {background: TBackground}>()
  const history = useHistory<History>()
  let background = location.state && location.state.background

  const back = () => {
    history.goBack()
  }

  return (
    <>
      <Switch location={background || location}>
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
