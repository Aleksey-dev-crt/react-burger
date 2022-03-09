import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectResetPassword({ children, ...rest }) {
  const { resetPassword } = useSelector((store) => store.registrationReducer)

  return <Route {...rest} render={() => (resetPassword.success ? children : <Redirect to="/forgot-password" />)} />
}
