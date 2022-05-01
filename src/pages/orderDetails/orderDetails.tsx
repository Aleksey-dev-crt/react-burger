import OrderDetailsStyles from './orderDetails.module.css';
import Loader from '../../components/Auxiliary/Loader/Loader';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useEffect, FC } from 'react';
import {
	IIngredient,
	IParams,
	IModalDetailsProps,
	ILocation,
} from '../../services/types/types';
import {
	wsConnectionOpen,
	wsConnectionAuthOpen,
	wsConnectionClose,
} from '../../services/actions/wsActions';

interface IIngredientDescriptionProps {
	ingredient: IIngredient;
}

const IngredientDescription: FC<IIngredientDescriptionProps> = ({
	ingredient,
}) => {
	return (
		<li className={OrderDetailsStyles.description__item}>
			<img
				className={OrderDetailsStyles.image}
				src={ingredient.image}
				alt={ingredient.name}
			/>
			<p
				className={
					'text text_type_main-default ml-4 ' +
					OrderDetailsStyles.ingredientName
				}>
				{ingredient.name}
			</p>
			<span className={'text text_type_digits-default ml-4 '}>
				{`${ingredient.orderCount} x ${ingredient.price}`}
			</span>
		</li>
	);
};

export const OrderDetails: FC<IModalDetailsProps> = ({ modal }) => {
	const dispatch = useDispatch();
	const { token } = useSelector((store) => store.registrationReducer);
	const { pathname } = useLocation<ILocation>();
	const params = useParams<IParams>();

	useEffect(() => {
		if (!modal) {
			if (pathname.includes(`profile/orders/${params.id}`) && token) {
				dispatch(wsConnectionAuthOpen());
			}
			if (pathname.includes(`feed/${params.id}`)) {
				dispatch(wsConnectionOpen());
			}
		}
		return () => {
			dispatch(wsConnectionClose());
		};
	}, [dispatch, params.id, token, pathname, modal]);

	const { modifyedIngredients } = useSelector(
		(store) => store.constructorReducer
	);
	const { messages } = useSelector((store) => store.wsReducer);

	const order = messages.orders.find((el) => el._id === params.id) || {
		createdAt: '',
		ingredients: [],
		name: '',
		number: 0,
		status: '',
		updatedAt: '',
		_id: '',
	};

	const date = new Date(order.createdAt).toLocaleString();

	const ingredientsObj = order.ingredients.reduce(
		(acc: { [el: string]: number }, el: string) => {
			acc[el] = (acc[el] || 0) + 1;
			return acc;
		},
		{}
	);

	const ingredients: IIngredient[] = [];
	let ingredientsPrice = 0;
	Object.keys(ingredientsObj).forEach((element) => {
		const ingredient = modifyedIngredients.find(
			(el: IIngredient) => el._id === element
		);
		if (ingredient) {
			ingredients.push(ingredient);
			ingredient.orderCount = ingredientsObj[element];
			let price = ingredient.price * ingredientsObj[element];
			ingredientsPrice += price;
		}
	});

	return (
		<>
			{!ingredients.length ? (
				<Loader />
			) : (
				<div
					className={
						modal
							? OrderDetailsStyles.container_modal
							: OrderDetailsStyles.container
					}>
					<h2
						className={
							'text text_type_digits-default pt-3 ' + OrderDetailsStyles.number
						}>
						{'#' + `${order.number}`.padStart(6, '0')}
					</h2>
					<h3
						className={
							'text text_type_main-medium pt-10 ' + OrderDetailsStyles.title
						}>
						{order.name}
					</h3>
					<span
						className={
							'text text_type_main-default pt-3 ' + OrderDetailsStyles.status
						}>
						выполнен
					</span>
					<h3
						className={
							'text text_type_main-medium pt-15 pb-6 ' +
							OrderDetailsStyles.title
						}>
						Состав:
					</h3>
					<ul className={OrderDetailsStyles.description}>
						{ingredients.map((el: IIngredient, i: number) => (
							<IngredientDescription key={i} ingredient={el} />
						))}
					</ul>
					<div
						className={
							'text text_type_main-default pt-10 ' + OrderDetailsStyles.total
						}>
						<p className='text text_type_main-default text_color_inactive'>
							{date}
						</p>
						<div className={OrderDetailsStyles.price}>
							<p className='text text_type_digits-default'>
								{ingredientsPrice}
							</p>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
