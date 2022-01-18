import PropTypes from 'prop-types'
import IngredientDetailsStyle from './IngredientDetails.module.css'

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
}

function IngredientDetails(props) {
  return (
    <div className={IngredientDetailsStyle.container}>
      <h2 className={'text text_type_main-large pt-3'}>Детали ингредиента</h2>
      <img className={IngredientDetailsStyle.image} src={props.image_large} alt={props.name} />
      <h3 className={'text text_type_main-medium pt-4 ' + IngredientDetailsStyle.title}>
        {props.name}
      </h3>
      <ul className={IngredientDetailsStyle.description}>
        <li className={IngredientDetailsStyle.description__item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <span className="text text_type_digits-default text_color_inactive">
            {props.calories}
          </span>
        </li>
        <li className={IngredientDetailsStyle.description__item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <span className="text text_type_digits-default text_color_inactive">
            {props.proteins}
          </span>
        </li>
        <li className={IngredientDetailsStyle.description__item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <span className="text text_type_digits-default text_color_inactive">{props.fat}</span>
        </li>
        <li className={IngredientDetailsStyle.description__item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <span className="text text_type_digits-default text_color_inactive">
            {props.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails
