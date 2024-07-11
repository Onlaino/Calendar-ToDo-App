import { ITask } from '../../../modal/types/tasks.interface';
import { TypeCalendarDay } from '../../types/calendar.types';

export interface IDividerProps {
	calendar: TypeCalendarDay[];
	setIsDividerOpen: (bool: boolean) => void;
	tasks: ITask[];
}