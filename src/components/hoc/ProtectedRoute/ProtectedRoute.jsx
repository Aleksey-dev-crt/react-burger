import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute({ children, ...rest }) {
  const { authorized } = useSelector((store) => store.registrationReducer)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorized ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  )
}