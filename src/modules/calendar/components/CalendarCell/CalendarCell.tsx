import { memo } from 'react';

import { useModal } from '../../../../hooks/useModal.ts';
import { convertDateForCell } from '../../helpers/convertDate.ts';
import { TypeCalendarDay } from '../../types/calendar.types.ts';
import { Day } from '../Day/Day.tsx';

interface ICalendarCellProps {
	handleDayClick: (item: TypeCalendarDay) => void;
	item: TypeCalendarDay;
}

export const CalendarCell = memo(
	({ handleDayClick, item }: ICalendarCellProps) => {
		const { tasks } = useModal();

		const calculateClassName = (item: TypeCalendarDay) => {
			const activeClass = item.active ? 'active' : '';
			const inactiveClass = item.inactive ? 'inactive' : '';
			return `calendar__cells-cell ${activeClass} ${inactiveClass}`;
		};

		return (
			<li
				onClick={() => handleDayClick(item)}
				className={calculateClassName(item)}
			>
				<span
					className={
						item.isDayOff
							? 'calendar__cells-cell-day dayOff'
							: 'calendar__cells-cell-day'
					}
				>
					{convertDateForCell(item.day)}
				</span>
				<div className='calendar__cells-cell-tasks'>
					<Day tasks={tasks} date={item.day} />
				</div>
			</li>
		);
	}
);
