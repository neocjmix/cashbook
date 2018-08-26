import './RecordList.scss'
import MonthlyRecords from './MonthlyRecords.template'

export default data => `${MonthlyRecords(data.monthly, data.records)}`;