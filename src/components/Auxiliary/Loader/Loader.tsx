import { FC } from 'react'
import LoaderStyles from './Loader.module.css'

const Loader: FC = () => {
  return (
    <div className={LoaderStyles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
