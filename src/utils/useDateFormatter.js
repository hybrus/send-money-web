import { useMemo } from 'react';
import moment from 'moment';

const useDateFormatter = () => {
	const formatDate = useMemo(() => {
		return (date) => moment(date).format('L h:mm A');
	}, []);

	return formatDate;
};

export default useDateFormatter;
