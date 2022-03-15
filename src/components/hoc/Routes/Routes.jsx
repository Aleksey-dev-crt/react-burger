import { useEffect } from 'react'
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { requestIngredients, requestUserData } from '../../../services/actions'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import {
  HomePage,
  Login,
  Feed,
  Orders,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  IngredientDetails,
} from '../../../pages'
import { getCookie } from '../../../utils/cookies'
import Modal from '../../Modals/Modal/Modal'
import { WS_CONNECTION_START } from '../../../services/actions/wsActionTypes'

export function Routes() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  let background = location.state && location.state.background

  useEffect(() => {
    dispatch(requestIngredients())
  }, [dispatch])

  useEffect(() => {
    dispatch(requestIngredients())
    const refreshToken = getCookie('refreshToken')
    if (refreshToken) dispatch(requestUserData(refreshToken))  
  }, [dispatch])

  useEffect(
    () => {
        dispatch({ type: WS_CONNECTION_START });
    },
    [] 
  )

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
          <Profile />
        </ProtectedRoute>
        <Route path="/profile/orders" exact={true}>
          <Orders />
        </Route>
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>

        <Redirect to="/react-burger" />
      </Switch>
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
