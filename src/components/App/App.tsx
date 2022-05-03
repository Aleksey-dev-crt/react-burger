import { FC, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../hoc/Routes/Routes';
import { useDispatch } from '../../utils/hooks';
import { getCookie } from '../../utils/cookies';
import { requestUserData, requestIngredients } from '../../services/actions';
import { DispatchThunk } from '../../services/types';

const App: FC = () => {
	const dispatch: DispatchThunk = useDispatch();

	useEffect(() => {
		dispatch(requestIngredients());
		const refreshToken = getCookie('refreshToken');
		if (refreshToken) dispatch(requestUserData(refreshToken));
	}, [dispatch]);

	return (
		<Router>
			<AppHeader />
			<Routes />
		</Router>
	);
};

export default App;
