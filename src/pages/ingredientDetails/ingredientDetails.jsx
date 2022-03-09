import IngredientDetailsStyles from './ingredientDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


const DescriptionItem = (props) => {
  return (
    <li className={IngredientDetailsStyles.description__item}>
      <p className="text text_type_main-default text_color_inactive">{props.description}</p>
      <span className="text text_type_digits-default text_color_inactive">{props.value}</span>
    </li>
  )
}

export function IngredientDetails() {
  const params = useParams()
  const { modifyedIngredients } = useSelector((store) => store.constructorReducer)
  const ingredient = modifyedIngredients.find(el => el._id === params.id) || {}  

  const descriptions = [
    { description: 'Калории, ккал', value: ingredient.calories },
    { description: 'Белки, г', value: ingredient.proteins },
    { description: 'Жиры, г', value: ingredient.fat },
    { description: 'Углеводы, г', value: ingredient.carbohydrates },
  ]

  return (
    <div className={IngredientDetailsStyles.container}>
      <h2 className={'text text_type_main-large pt-3'}>Детали ингредиента</h2>
      <img className={IngredientDetailsStyles.image} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={'text text_type_main-medium pt-4 ' + IngredientDetailsStyles.title}>
        {ingredient.name}
      </h3>
      <ul className={IngredientDetailsStyles.description}>
        {descriptions.map((el) => (
          <DescriptionItem key={el.description} description={el.description} value={el.value} />
        ))}
      </ul>
    </div>
  )
}
