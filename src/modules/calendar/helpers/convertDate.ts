export 	const convertDateForCell = (date: Date) => {
	return date.toLocaleString().split(',')[0].split('/')[1];
};