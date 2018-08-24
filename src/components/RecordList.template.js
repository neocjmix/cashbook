import './RecordList.scss'
import monthlyRecords from './monthlyRecords.template'

export default data => `${monthlyRecords(data.monthly)}`;