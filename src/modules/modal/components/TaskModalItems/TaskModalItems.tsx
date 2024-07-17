import './TaskModalItems.css';
import { ITask } from '../../types/tasks.interface.ts';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { memo } from 'react';

export const TaskModalItem = memo(
	({
		task,
		changeCheckbox,
		deleteTask,
	}: {
		task: ITask;
		changeCheckbox: (id: string, completed: boolean) => void;
		deleteTask: () => void;
	}) => {
		const calculateTitleClassName = (task: ITask) => {
			const completedClass = 'modal__content-item-title completed';
			const unCompletedClass = 'modal__content-item-title';
			return task.completed ? completedClass : unCompletedClass;
		};

		return (
			<div className='modal__content-item' key={task.id}>
				<div className={calculateTitleClassName(task)}>
					<p>{task.title}</p>
					<div className='modal__content-item-icons'>
						<input
							type='checkbox'
							checked={task.completed}
							onChange={() => changeCheckbox(task.id, task.completed)}
						/>
						<div className='modal__content-item-delete' onClick={deleteTask}>
							<DeleteForeverIcon />
						</div>
					</div>
				</div>
				<p className='modal__content-item-descr'>{task.description}</p>
			</div>
		);
	}
);
