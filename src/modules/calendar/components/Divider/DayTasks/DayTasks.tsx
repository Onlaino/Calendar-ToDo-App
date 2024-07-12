import { useEffect, useMemo, useState } from 'react';

import './DayTasks.css';

import { ITask } from '../../../../modal/types/tasks.interface';
import { IDayTasksProps } from './DayTask.props';

import DoneAllIcon from '@mui/icons-material/DoneAll';


export const DayTasks = ({ date, tasks }: IDayTasksProps) => {
	const [dayTasks, setDayTasks] = useState<ITask[]>();

	const tasksForDay = useMemo(() => {
		return tasks.filter(
			task => task.date.split('T')[0] === date.toISOString().split('T')[0]
		);
	}, [tasks, date]);

	useEffect(() => {
		setDayTasks(tasksForDay);
	}, [tasksForDay]);

	return (
		<ul className='divider__tasks'>
			{dayTasks?.map(task => (
				<li className='divider__task' key={task.id}>
					<h5 className='divider__task-head'>
						{task.title} {task.completed && <DoneAllIcon fontSize='small' />}
					</h5>
					<p className='divider__task-descr'>{task.description}</p>
				</li>
			))}
		</ul>
	);
};
