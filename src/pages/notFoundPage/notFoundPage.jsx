import { Link } from 'react-router-dom'

export function NotFoundPage() {
    return (     
        <h2>
            Такой страницы не существует. Перейдите на <Link to ='/react-burger'>главную.</Link> 
        </h2>
    )
  }