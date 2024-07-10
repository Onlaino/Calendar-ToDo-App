import './CalendarCells.css';
import { Day } from '../Day/Day';
import { useUser } from '../../hooks/useUserContext';
import { useModal } from '../../hooks/useModal';
import { TypeCalendarDay } from '../../utils/calendar.types';
import { generateCalendar } from '../../utils/generateCalendar';
import { useCallback, useEffect, useState } from 'react';

export const CalendarCells = ({ date }: { date: Date }) => {
	const { user } = useUser();
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([]);
	const { setTasks, setIsOpen, setSelectedDay, tasks } = useModal();

	const convertDate = (date: Date) => {
		return date.toLocaleString().split(',')[0].split('/')[1];
	};

	const calculateClassName = (item: TypeCalendarDay) => {
		const activeClass = item.active ? 'active' : '';
		const inactiveClass = item.inactive ? 'inactive' : '';
		return `calendar__cells-cell ${activeClass} ${inactiveClass}`;
	};

	const handleDayClick = async (calendarDay: TypeCalendarDay) => {
		setSelectedDay(calendarDay.day);
		setIsOpen(true);
	};

	const fetchCalendarDays = useCallback(async () => {
		const calendarDays = await generateCalendar(date, user.tasks);
		setCalendar(calendarDays);
	}, [date, user.tasks, setCalendar]);

	// useEffect(() => {
	// 	async function fetchCalendarDays() {
	// 		const calendarDays = await generateCalendar(date, user.tasks);
	// 		setCalendar(calendarDays);
	// 	}
	// 	fetchCalendarDays().catch(console.error);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [date, tasks, setTasks]);

	useEffect(() => {
		fetchCalendarDays().catch(console.error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchCalendarDays]);

	return (
		<ul className='calendar__cells'>
			{calendar.map((item, index) => (
				<li
					onClick={() => handleDayClick(item)}
					key={index}
					className={calculateClassName(item)}
				>
					<span
						className={
							item.isDayOff
								? 'calendar__cells-cell-day dayOff'
								: 'calendar__cells-cell-day'
						}
					>
						{convertDate(item.day)}
					</span>
					<div className='calendar__cells-cell-tasks'>
						<Day tasks={tasks} date={item.day} />
					</div>
				</li>
			))}
		</ul>
	);
};
