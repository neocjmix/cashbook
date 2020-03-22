import currencyFormatter from 'currency-formatter'
import Moment from "moment";
import {extendMoment} from 'moment-range';
const moment = extendMoment(Moment);

const sum = (a, b) => a + b;
const toNumber = value => typeof value === "number" ? value : (value + "").replace(/[^\d]/g,"")*1 || 0;
const monthDays = (month) => Array.from(moment.range(moment(month).startOf('month'), moment(month).endOf('month')).by('days'));
const dayRange = (day) => moment.rangeFromInterval('day', 1, day);
const getAmountClass = amount => amount === 0 ? "" : amount < 0 ? 'withdrawal' : 'deposit';
const formatCurrency = (amount, absolute = true) => currencyFormatter.format(absolute ? Math.abs(amount) : amount, {code: 'KRW'});

export {getAmountClass, formatCurrency, sum, toNumber, monthDays, dayRange}
