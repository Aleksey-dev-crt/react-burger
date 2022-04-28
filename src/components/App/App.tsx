import { FC } from 'react'
import AppHeader from '../AppHeader/AppHeader'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from '../hoc/Routes/Routes'

const App: FC = () => {
  return (
    <Router>
      <AppHeader />
      <Routes />
    </Router>
  )
}

export default App
