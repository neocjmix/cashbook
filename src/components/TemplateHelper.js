import currencyFormatter from 'currency-formatter'

const getAmountClass = amount => amount === 0 ? "" : amount < 0 ? 'withdrawal' : 'deposit';
const formatCurrency = (amount, absolute = true) => currencyFormatter.format(absolute ? Math.abs(amount) : amount, {code: 'KRW'});

export {getAmountClass, formatCurrency}