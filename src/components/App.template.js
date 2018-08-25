import './RecordList.scss'
import RecordList from './RecordList.template'
import Graph from './Graph.template'

export default data => `
    <div id="graph-wrapper">${Graph(data)}</div>
    <div id="records-wrapper">${RecordList(data)}</div>`;