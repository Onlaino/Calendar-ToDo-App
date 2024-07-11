import { ITask } from '../../modal/types/tasks.interface.ts'

async function checkIsDayOff(date: Date): Promise<boolean> {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	const formattedDate = `${year}${month}${day}`; 

	const response = await fetch(`https://isdayoff.ru/${formattedDate}`);
	const result = await response.text();
	
	return result === '1';
}

export const generateCalendar = async (date: Date, tasks: ITask[]) => {
	const year = date.getFullYear()
	const month = date.getMonth()
	let firstDayOfMonth = new Date(year, month, 1).getDay()
	firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
	const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
	const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay()
	const lastDateOfPreviousMonth = new Date(year, month, 0).getDate()

	const calendarDays = []

	for (let i = firstDayOfMonth; i > 0; i--) {
		const day = new Date(year, month - 1, lastDateOfPreviousMonth - i + 1)
		const isDayOff = await checkIsDayOff(day);
		calendarDays.push({
			day,
			inactive: true,
			tasks: tasks,
			isDayOff: isDayOff
		})
	}

	for (let i = 1; i <= lastDateOfMonth; i++) {
		const isToday =
			i === date.getDate() &&
			month === new Date().getMonth() &&
			year === new Date().getFullYear()
		const day = new Date(year, month, i)
		const isDayOff = await checkIsDayOff(day);
		calendarDays.push({
			day,
			active: isToday,
			tasks: tasks,
			isDayOff: isDayOff,
		});
	}

	const daysToAdd = 6 - (lastDayOfMonth === 0 ? 6 : lastDayOfMonth)
	for (let i = 1; i <= daysToAdd; i++) {
		const day = new Date(year, month + 1, i);
		const isDayOff = await checkIsDayOff(day);
		calendarDays.push({
			day,
			inactive: true,
			tasks: tasks,
			isDayOff: isDayOff
		})
	}
	return calendarDays
}
