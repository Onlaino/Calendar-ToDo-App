import { memo, useState } from 'react'

import './Calendar.css'

import { TasksModal } from '../../../components/TaskModal/TaskModal.tsx'
import { CalendarCells } from '../CalendarCells/CalendarCells.tsx'
import { CalendarHeading } from '../CalendarHeading/CalendarHeading.tsx'
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays.tsx'

export const Calendar = memo(() => {
	const [date, setDate] = useState<Date>(new Date())

	return (
		<section className='calendar'>
			<TasksModal />
			<CalendarHeading date={date} setDate={setDate} />
			<CalendarWeekdays />
			<CalendarCells date={date} />
		</section>
	)
})
