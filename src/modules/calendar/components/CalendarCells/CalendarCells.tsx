import { useCallback, useEffect, useState } from 'react';

import './CalendarCells.css';

import { Day } from '../Day/Day.tsx';
import { Divider } from '../Divider/Divider.tsx';
import { useUser } from '../../../../hooks/useUserContext.tsx';
import { useModal } from '../../../../hooks/useModal.ts';
import { TypeCalendarDay } from '../../types/calendar.types.ts';
import { generateCalendar } from '../../helpers/generateCalendar.ts';
import { ICalendarCellsProps } from './CalendarCells.props.ts';

export const CalendarCells = ({
	date,
	isDividerOpen,
	setIsDividerOpen,
}: ICalendarCellsProps) => {
	const { user } = useUser();
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([]);
	const { setIsOpen, setSelectedDay, tasks } = useModal();

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

	useEffect(() => {
		fetchCalendarDays().catch(console.error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchCalendarDays]);

	return (
		<>
			<ul className='calendar__cells'>
				{isDividerOpen && (
					<Divider
						tasks={tasks}
						setIsDividerOpen={setIsDividerOpen}
						calendar={calendar}
					/>
				)}
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
		</>
	);
};
