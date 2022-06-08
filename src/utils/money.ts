export const toCurrency = (sum: number): string => {
	const leadingSign = sum < 0 ? '-' : ''

	const absValue = Math.floor(Math.abs(sum));

	const decimalPlace = Number.isInteger(sum) ? '' : `.${Math.floor((Math.abs(sum) * 100 % 100))}`.padEnd(3, '0')

	return `${leadingSign}$${absValue}${decimalPlace}`
}


