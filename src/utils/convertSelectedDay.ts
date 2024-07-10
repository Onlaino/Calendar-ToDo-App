export const convertDate = (day: Date) => {
	const readableDate = new Date(day).toLocaleDateString('ru-RU', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return  readableDate[0].toUpperCase() + readableDate.slice(1);
};
