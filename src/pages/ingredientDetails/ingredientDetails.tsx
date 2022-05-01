import { FC } from 'react'
import IngredientDetailsStyles from './ingredientDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IIngredient, IParams, IModalDetailsProps } from '../../services/types/types'

interface IDescriptionItemProps {
  description: string,
  value: number,
}

const DescriptionItem: FC<IDescriptionItemProps> = ({ description, value }) => {
  return (
    <li className={IngredientDetailsStyles.description__item}>
      <p className="text text_type_main-default text_color_inactive">{description}</p>
      <span className="text text_type_digits-default text_color_inactive">{value}</span>
    </li>
  )
}

export const IngredientDetails: FC<IModalDetailsProps> = ({ modal }) => {
  const params = useParams<IParams>()
  const { modifyedIngredients } = useSelector((store: any) => store.constructorReducer)
  const ingredient = modifyedIngredients.find((el: IIngredient) => el._id === params.id) || {}  

  const descriptions = [
    { description: 'Калории, ккал', value: ingredient.calories },
    { description: 'Белки, г', value: ingredient.proteins },
    { description: 'Жиры, г', value: ingredient.fat },
    { description: 'Углеводы, г', value: ingredient.carbohydrates },
  ]

  return (
    <div className={modal ? IngredientDetailsStyles.container_modal : IngredientDetailsStyles.container}>
      <h2 className={'text text_type_main-large pt-3'}>Детали ингредиента</h2>
      <img className={IngredientDetailsStyles.image} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className={'text text_type_main-medium pt-4 ' + IngredientDetailsStyles.title}>
        {ingredient.name}
      </h3>
      <ul className={IngredientDetailsStyles.description}>
        {descriptions.map((el: IDescriptionItemProps) => (
          <DescriptionItem key={el.description} description={el.description} value={el.value} />
        ))}
      </ul>
    </div>
  )
}
