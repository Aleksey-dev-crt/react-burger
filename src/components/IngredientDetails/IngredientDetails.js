import PropTypes from 'prop-types'
import IngredientDetailsStyles from './IngredientDetails.module.css'

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
    <div className={IngredientDetailsStyles.container}>
      <h2 className={'text text_type_main-large pt-3'}>Детали ингредиента</h2>
      <img className={IngredientDetailsStyles.image} src={props.image_large} alt={props.name} />
      <h3 className={'text text_type_main-medium pt-4 ' + IngredientDetailsStyles.title}>
        {props.name}
      </h3>
      <ul className={IngredientDetailsStyles.description}>
        <li className={IngredientDetailsStyles.description__item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <span className="text text_type_digits-default text_color_inactive">
            {props.calories}
          </span>
        </li>
        <li className={IngredientDetailsStyles.description__item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <span className="text text_type_digits-default text_color_inactive">
            {props.proteins}
          </span>
        </li>
        <li className={IngredientDetailsStyles.description__item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <span className="text text_type_digits-default text_color_inactive">{props.fat}</span>
        </li>
        <li className={IngredientDetailsStyles.description__item}>
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
