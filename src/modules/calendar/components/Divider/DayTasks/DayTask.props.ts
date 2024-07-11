import { ITask } from '../../../../modal/types/tasks.interface';

export interface IDayTasksProps {
	date: Date;
	tasks: ITask[];
}
