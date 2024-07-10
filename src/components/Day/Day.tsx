import './Day.css'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'
import { IDayProps } from './Day.props'
import { useEffect, useMemo, useState } from 'react'
import { useModal } from '../../hooks/useModal'

export const Day = ({ date, tasks }: IDayProps) => {
	const { user } = useUser()
	const { setTasks } = useModal()
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

	useEffect(() => {
		setDayTasks(tasksForDay)
	},[tasksForDay])

	return (
		<div className='calendar__cells-cell-tasks'>
			{dayTasks.map(task => (
				<div className={calculateClassName(task)} key={task.id}>
					<span>&#8226;</span>&nbsp;
					{task.title.slice(0, 10) + '...'}
				</div>
			))}
		</div>
	);
}
