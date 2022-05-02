import { FC } from 'react';
import OrdersStyles from './Orders.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient, ILocation, IOrder } from '../../services/types/types';

interface IOrderProps {
	order: IOrder;
	historyOrders?: boolean;
}

const Order: FC<IOrderProps> = ({ order, historyOrders }) => {
	const { modifyedIngredients } = useSelector(
		(store) => store.constructorReducer
	);
	const location = useLocation<ILocation>();
	const date = new Date(order.createdAt).toLocaleString();
	const ingredients: Array<IIngredient> = [];
	let ingredientsPrice: number = 0;
	let path: string = '/feed';
	order.ingredients.forEach((element) => {
		const ingredient = modifyedIngredients.find(
			(el: IIngredient) => el._id === element
		);
		if (ingredient) {
			ingredients.push(ingredient);
			ingredientsPrice += ingredient.price;
		}
	});

	type TStatus = {
		[key: string]: string;
	};

	const status: TStatus = {
		done: 'Выполнен',
		created: 'Создан',
		pending: 'Готовится',
	};

	if (historyOrders) path = '/profile/orders';

	return (
		<Link
			className={OrdersStyles.order}
			key={order._id}
			to={{
				pathname: `${path}/${order._id}`,
				state: { background: location },
			}}>
			<div className={OrdersStyles.orderNumber}>
				<p className='text text_type_digits-default'>
					{'#' + `${order.number}`.padStart(6, '0')}
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					{date}
				</p>
			</div>
			<div>
				<h2 className='text text_type_main-medium'>{order.name}</h2>
				{historyOrders ? (
					<p
						className='text text_type_digits-small mt-2'
						style={{ color: order.status === 'done' ? '#00CCCC' : '#F2F2F3' }}>
						{status[order.status]}
					</p>
				) : null}
			</div>
			<div className={OrdersStyles.orderDescription}>
				<div className={OrdersStyles.ingredient}>
					{ingredients.map((el, i, arr) => (
						<img
							style={{ zIndex: `${arr.length - i}` }}
							key={i}
							src={el.image}
							alt={el.name}
						/>
					))}
				</div>
				<div className={OrdersStyles.price}>
					<p className='text text_type_digits-default'>{ingredientsPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</Link>
	);
};

interface IOrdersProps {
	orders: ReadonlyArray<IOrder>;
	historyOrders?: boolean;
}

export const Orders: FC<IOrdersProps> = ({ orders, historyOrders }) => {
	return (
		<ul className={'mt-10 ' + OrdersStyles.ordersContainer}>
			{orders.map((el) => (
				<Order key={el._id} order={el} historyOrders={historyOrders} />
			))}
		</ul>
	);
};
