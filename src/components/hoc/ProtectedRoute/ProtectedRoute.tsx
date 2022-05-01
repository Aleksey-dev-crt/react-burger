import { FC, ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from '../../../utils/hooks'

interface ICountProps {
  children: ReactNode
  path: string
  exact: boolean
}

export const ProtectedRoute: FC<ICountProps> = ({ children, ...rest }) => {
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