import { useCallback, useEffect, useState } from 'react';

import './CalendarCells.css';

import { Divider } from '../Divider/Divider.tsx';
import { useUser } from '../../../../hooks/useUserContext.tsx';
import { useModal } from '../../../../hooks/useModal.ts';
import { TypeCalendarDay } from '../../types/calendar.types.ts';
import { generateCalendar } from '../../helpers/generateCalendar.ts';
import { ICalendarCellsProps } from './CalendarCells.props.ts';
import { CalendarCell } from '../CalendarCell/CalendarCell.tsx';

export const CalendarCells = ({
	date,
	isDividerOpen,
	setIsDividerOpen,
}: ICalendarCellsProps) => {
	const { user } = useUser();
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([]);
	const { setIsOpen, setSelectedDay, tasks } = useModal();


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
				{calendar.map((item) => (
					<CalendarCell
						item={item}
						handleDayClick={handleDayClick}
						key={item.day.toISOString()}
					/>
				))}
			</ul>
		</>
	);
};
