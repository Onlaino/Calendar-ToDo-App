import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ITask } from '../../../modal/types/tasks.interface.ts';

export interface IDayProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	date: Date;
	tasks: ITask[];
}