import './styles/global.css';

import { Login } from './modules/login/components/Login/Login.tsx';
import { Calendar } from './modules/calendar/components/Calendar/Calendar.tsx';

import { UserContextProvider } from './context/UserContext/UserContext.tsx';
import { ModalContextProvider } from './context/ModalContext/ModalContext.tsx';

export const App = () => {
	return (
		<main className='main'>
			<UserContextProvider>
				<ModalContextProvider>
					<Login />
					<Calendar />
				</ModalContextProvider>
			</UserContextProvider>
		</main>
	);
};
