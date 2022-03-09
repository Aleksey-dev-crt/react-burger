import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectProfile({ children, ...rest }) {
  const { authorized } = useSelector((store) => store.registrationReducer)

  return <Route {...rest} render={() => (authorized ? children : <Redirect to="/login" />)} />
}
