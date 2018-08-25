import './RecordList.scss'
import monthlyRecords from './MonthlyRecords.template'


const toLineto = coords => coords.map(({x, y}) => `L ${x} ${y}`).join(" ");

export default data => {
    let offsetX = -1525405088 + (64*24*60*60) + (12*60*60) + (38*60) + 8;
    let offsetY = 300;
    const scaleX = 35;
    const scaleY = 1;
    const scaleXMultiplier = 1/(60*60*24);
    const scaleYMultiplier = 0.0001;

    const toSvgCoord = ({dateTime, amount}) => ({
        x: (offsetX + dateTime) * scaleX * scaleXMultiplier,
        y: offsetY -amount * scaleY * scaleYMultiplier
    });

    const records = data.monthly
        .map(m => m.daily)
        .reduce((a,b) => a.concat(b))
        .map(m => m.records)
        .reduce((a,b) => a.concat(b))
        .filter(record => record.type === "bank")
        .map(record => ({dateTime : record.dateTime.unix(), amount : record.amount, content : record.content}))
        .reduce((arr, {dateTime, amount, content}) => arr.concat([{dateTime, content, amount : arr[arr.length - 1].amount + amount}]), [{amount : 0}])
        .slice(1);

    const coords = records.map(toSvgCoord);
    const pathCoords = coords.concat([
        {x : 99999, y: coords.slice(-1)[0].y},
        {x : 99999, y: 99999},
        {x : 0, y: 99999},
        {x : 0, y: coords[0].y}
    ]);

    return `
        <svg version="1.1" baseProfile="full" width="100%" height="700" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 300 ${toLineto(pathCoords)}" stroke-width="0" fill="rgba(100,255,200,0.1)" />
            
            ${records.map(record => ({...toSvgCoord(record), ...{date : new Date(record.dateTime*1000), content : record.content}})).map(({x, y, date, content}) => 
                `<circle cx="${x}" cy="${y}" r="1" fill="rgba(100,255,200,0.3)" />`).join("\n")}
       </svg>`;
};