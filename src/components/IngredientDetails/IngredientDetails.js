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

DescriptionItem.propTypes = {
  description: PropTypes.string,
  value: PropTypes.number,  
}

const DescriptionItem = (props) => {
  return (
    <li className={IngredientDetailsStyles.description__item}>
      <p className="text text_type_main-default text_color_inactive">{props.description}</p>
      <span className="text text_type_digits-default text_color_inactive">{props.value}</span>
    </li>
  )
}

function IngredientDetails(props) {
  const descriptions = [
    { description: 'Калории, ккал', value: props.calories },
    { description: 'Белки, г', value: props.proteins },
    { description: 'Жиры, г', value: props.fat },
    { description: 'Углеводы, г', value: props.carbohydrates },
  ]

  return (
    <div className={IngredientDetailsStyles.container}>
      <h2 className={'text text_type_main-large pt-3'}>Детали ингредиента</h2>
      <img className={IngredientDetailsStyles.image} src={props.image_large} alt={props.name} />
      <h3 className={'text text_type_main-medium pt-4 ' + IngredientDetailsStyles.title}>
        {props.name}
      </h3>
      <ul className={IngredientDetailsStyles.description}>
        {descriptions.map((el, i) => (
          <DescriptionItem key={i} description={el.description} value={el.value} />
        ))}
      </ul>
    </div>
  )
}

export default IngredientDetails
