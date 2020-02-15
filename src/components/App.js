import './RecordList.scss'
import RecordList from './RecordList'
import Graph from './Graph'

export default data => `
    <div id="graph-wrapper">${Graph(data)}</div>
    <div id="records-wrapper">${RecordList(data)}</div>`;
