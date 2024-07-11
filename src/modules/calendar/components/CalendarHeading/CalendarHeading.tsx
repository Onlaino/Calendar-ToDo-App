import './CalendarHeading.css';
import { months } from '../../helpers/calendar.helper.ts'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { ICalendarHeadingProps } from './CalendarHeading.props.ts'

export const CalendarHeading = ({ date, setDate }: ICalendarHeadingProps) => {
	return (
		<header className='calendar__heading'>
			<button
				className='calendar__heading-button'
				onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
			>
				<ArrowBackIosIcon />
			</button>
			<button
				className='calendar__heading-button'
				onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
			>
				<ArrowForwardIosIcon />
			</button>
			{months[date.getMonth()]} {date.getFullYear()}
		</header>
	)
}
