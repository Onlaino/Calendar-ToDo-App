import { memo, useState } from 'react';

import './Calendar.css';

import { TasksModal } from '../../../modal/components/TaskModal/TaskModal.tsx';
import { CalendarCells } from '../CalendarCells/CalendarCells.tsx';
import { CalendarHeading } from '../CalendarHeading/CalendarHeading.tsx';
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays.tsx';

export const Calendar = memo(() => {
	const [date, setDate] = useState<Date>(new Date());
	const [isDividerOpen, setIsDividerOpen] = useState(false);

	return (
		<section className='calendar'>
			<button
				className='calendar__weektasks'
				onClick={() => setIsDividerOpen(true)}
			>
				{/* <DateRangeIcon color='info' /> */}
				<img src='/calendarIcon.svg' alt='calendar weeks' />
			</button>
			<TasksModal />
			<CalendarHeading date={date} setDate={setDate} />
			<CalendarWeekdays />
			<CalendarCells
				isDividerOpen={isDividerOpen}
				setIsDividerOpen={setIsDividerOpen}
				date={date}
			/>
		</section>
	);
});
