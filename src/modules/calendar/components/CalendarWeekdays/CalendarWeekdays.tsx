import { memo } from 'react';
import { weekdays } from '../../helpers/calendar.helper.ts';

export const CalendarWeekdays = memo(() => {
	return (
		<ul className='calendar__weekdays'>
			{weekdays.map((wd, i) => (
				<li key={i} className='calendar__weekdays-day'>
					{wd}
				</li>
			))}
		</ul>
	);
});
