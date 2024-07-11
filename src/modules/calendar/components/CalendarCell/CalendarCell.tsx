import {Day} from "../Day/Day.tsx";

export const CalendarCell = () => {
  return (
    <li
      onClick={() => handleDayClick(item)}
      key={index}
      className={calculateClassName(item)}
    >
					<span
            className={
              item.isDayOff
                ? 'calendar__cells-cell-day dayOff'
                : 'calendar__cells-cell-day'
            }
          >
						{convertDate(item.day)}
					</span>
      <div className='calendar__cells-cell-tasks'>
        <Day tasks={tasks} date={item.day}/>
      </div>
    </li>
  )
}