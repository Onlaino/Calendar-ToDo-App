import { ITask } from '../../modal/types/tasks.interface.ts'

export type TypeCalendarDay = {
	day: Date
	inactive?: boolean
	active?: boolean
	tasks?: ITask[]
	isDayOff: boolean
}
