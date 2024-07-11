import { ITask } from '../../modal/types/tasks.interface.ts';

export interface IUser {
	id: string;
	name: string;
	tasks: ITask[]
}