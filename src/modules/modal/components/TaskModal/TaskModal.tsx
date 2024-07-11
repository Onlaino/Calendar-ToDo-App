import { FormEventHandler, useEffect, useState } from 'react';

import './TaskModal.css';
import './MediaTaskModal.css';

import CloseIcon from '@mui/icons-material/Close';
import { ITask } from '../../types/tasks.interface.ts';
import { useUser } from '../../../../hooks/useUserContext.tsx';
import { useModal } from '../../../../hooks/useModal.ts';
import { TaskService } from '../../../../services/taskService.ts';
import { v4 as uuidv4 } from 'uuid';
import { TaskModalItem } from '../TaskModalItems/TaskModalItems.tsx';
import { TaskModalForm } from '../TaskModalForm/TaskModalForm.tsx';
import { convertDate } from '../../../calendar/helpers/convertSelectedDay.ts';

const taskService = new TaskService();

export const TasksModal = () => {
	const { user } = useUser();
	const { isOpen, setIsOpen, setTasks, tasks, selectedDay } = useModal();
	const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
	const [formTask, setFormTask] = useState<ITask>({
		id: '',
		title: '',
		description: '',
		date: '',
		completed: false,
	});

	const generateTasksForDay = () => {
		if (selectedDay) {
			return tasks.filter(
				task =>
					task.date.split('T')[0] === selectedDay.toISOString().split('T')[0]
			);
		}
	};
	const filterTasks = generateTasksForDay();

	useEffect(() => {
		filterTasks && setFilteredTasks(filterTasks);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasks, selectedDay]);

	const handleAddTask: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		if (!user.id) {
			alert('Войдите в систему для добавления задач!');
			return;
		}
		const newTask = { ...formTask, date: selectedDay, id: uuidv4() };

		try {
			const userWithAddedTask = await taskService.addTaskByUserId(
				user.id,
				newTask
			);
			const taskToAdd =
				userWithAddedTask.tasks[userWithAddedTask.tasks.length - 1];

			setTasks(prev => [...prev, taskToAdd]);
			setFormTask({
				id: '',
				title: '',
				description: '',
				date: '',
				completed: false,
			});
		} catch (error) {
			console.error('Failed to add task:', error);
		}
	};

	const handleDeleteTask = async (userId: string, taskId: string) => {
		try {
			await taskService.deleteTaskByUserId(userId, taskId);
			const updatedTasks = tasks.filter(task => task.id !== taskId);
			setTasks(updatedTasks);
		} catch (e) {
			console.error('Не удалось удалить задачу:', e);
		}
	};

	const handleCheckboxChange = async (id: string, completed: boolean) => {
		try {
			await taskService.changeCheckBox(user.id, id);
			setFilteredTasks(tasks =>
				tasks.map(task =>
					task.id === id ? { ...task, completed: !completed } : task
				)
			);
			setTasks(
				tasks.map(task =>
					task.id === id ? { ...task, completed: !completed } : task
				)
			);
		} catch (e) {
			console.error('Не удалось поменять статус задачи', e);
		}
	};

	const renderFilteredTask = (tasks: ITask[]) => {
		if (tasks && tasks.length) {
			return tasks.map(ft => (
				<TaskModalItem
					key={ft.id}
					task={ft}
					changeCheckbox={() => handleCheckboxChange(ft.id, ft.completed)}
					deleteTask={() => handleDeleteTask(user.id, ft.id)}
				/>
			));
		}

		return <h4>Not found tasks for this day</h4>;
	};

	if (!isOpen) return null;

	return (
		<section className='modal__wrapper'>
			<div className={`modal ${isOpen && 'modal__animate'}`}>
				<div className='modal__close' onClick={() => setIsOpen(false)}>
					<CloseIcon />
				</div>
				<h2 className='modal__heading'>
					{selectedDay && convertDate(selectedDay)}
				</h2>
				<div className='modal__form-content-form'>
					<TaskModalForm
						formTask={formTask}
						deleteTask={handleDeleteTask}
						addTask={handleAddTask}
						setFormTask={setFormTask}
					/>
					<div className='modal__content'>
						{renderFilteredTask(filteredTasks)}
					</div>
				</div>
			</div>
		</section>
	);
};
