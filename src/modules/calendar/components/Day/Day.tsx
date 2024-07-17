import './Day.css'
import { ITask } from '../../../modal/types/tasks.interface.ts'
import { IDayProps } from './Day.props.ts'
import { memo, useEffect, useMemo, useState } from 'react'

export const Day = memo(({ date, tasks }: IDayProps) => {
	const [dayTasks, setDayTasks] = useState<ITask[]>([])

	const calculateClassName = (task: ITask) => {
		const completedClass = 'calendar__cells-cell-tasks-item completed'
		const unCompletedClass = 'calendar__cells-cell-tasks-item'
		return task.completed ? completedClass : unCompletedClass
	}

	const tasksForDay = useMemo(() => {
    return tasks.filter(
      task => task.date.split('T')[0] === date.toISOString().split('T')[0]
    );
  }, [tasks, date]);

	const renderTitle = (title: string) => {
		if (title.length >= 10) return title.slice(0, 10) + '...';
		return title;
	}

	useEffect(() => {
		setDayTasks(tasksForDay)
	},[tasksForDay])

	return (
		<div className='calendar__cells-cell-tasks'>
			{dayTasks.map(task => (
				<div className={calculateClassName(task)} key={task.id}>
					<span>&#8226;</span>&nbsp;
					{renderTitle(task.title)}
				</div>
			))}
		</div>
	);
})
