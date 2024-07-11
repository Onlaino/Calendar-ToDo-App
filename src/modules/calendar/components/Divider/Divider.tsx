import './Divider.css';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { DayTasks } from './DayTasks/DayTasks';
import { IDividerProps } from './Divider.props';
import { convertDate } from '../../helpers/convertSelectedDay';

export const Divider = ({
	calendar,
	setIsDividerOpen,
	tasks,
}: IDividerProps) => {
	const [sliceOne, setSliceOne] = useState(0);
	const [sliceTwo, setSliceTwo] = useState(7);

	return (
		<section className='divider__wrapper'>
			<div className='divider__close' onClick={() => setIsDividerOpen(false)}>
				<CloseIcon />
			</div>
			<div className='divider'>
				<button
					className='divider__button'
					disabled={sliceTwo <= 7}
					onClick={() => {
						setSliceOne(sliceOne - 7);
						setSliceTwo(sliceTwo - 7);
					}}
				>
					<ArrowBackIosIcon />
				</button>
				<button
					className='divider__button'
					disabled={sliceTwo >= calendar.length}
					onClick={() => {
						setSliceOne(sliceOne + 7);
						setSliceTwo(sliceTwo + 7);
					}}
				>
					<ArrowForwardIosIcon />
				</button>
				<ul className='divider__days-list'>
					{calendar.slice(sliceOne, sliceTwo).map(day => (
						<li className='divider__day' key={day.day.toString()}>
							<h3 className='divider__day-head'>
								{convertDate(day.day)}
							</h3>
							<DayTasks date={day.day} tasks={tasks} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
