import './Divider.css';

import { useEffect, useRef, useState } from 'react';

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
	const [showDivider, setShowDivider] = useState(true);
	const closeTimerRef = useRef<number | null>(null);
	const dividerWrapperRef = useRef<HTMLDivElement | null>(null);

	const handleClose = () => {
		setShowDivider(false);
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
		}
		closeTimerRef.current = setTimeout(() => {
			setIsDividerOpen(false);
		}, 350);
	};

	useEffect(() => {
		const handleWrapperClick = (event: MouseEvent) => {
			if (event.target === dividerWrapperRef.current) {
				handleClose();
			}
		};

		const currentDividerWrapper = dividerWrapperRef.current;
		if (currentDividerWrapper) {
			currentDividerWrapper.addEventListener('click', handleWrapperClick);
		}

		return () => {
			if (currentDividerWrapper) {
				currentDividerWrapper.removeEventListener('click', handleWrapperClick);
			}
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
			}
		};
	}, []);

	return (
		<section className='divider__wrapper' ref={dividerWrapperRef}>
			<div className='divider__close' onClick={handleClose}>
				<CloseIcon />
			</div>
			<div
				className={`divider ${
					showDivider ? 'divider__animate' : 'divider__animate-remove'
				}`}
			>
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
							<h3 className='divider__day-head'>{convertDate(day.day)}</h3>
							<DayTasks date={day.day} tasks={tasks} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
