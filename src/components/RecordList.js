import './RecordList.scss'
import MonthlyRecords from './MonthlyRecords'

export default data => `${MonthlyRecords(data.monthly, data.records)}`;
