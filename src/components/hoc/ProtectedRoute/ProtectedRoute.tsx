import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useSelector } from '../../../utils/hooks'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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