import { useMemo } from 'react';

const useMoneyFormatter = () => {
	const formatMoney = useMemo(() => {
		return (amount) => {
			const moneyFormatter = new Intl.NumberFormat('en-PH', {
				style: 'currency',
				currency: 'PHP',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
			return moneyFormatter.format(amount);
		};
	}, []);

	return formatMoney;
};

export default useMoneyFormatter;
