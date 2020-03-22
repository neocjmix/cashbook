import './RecordList.scss'
import { $circle, $path, $svg } from 'lib/dognut/svgComponent'

const toLine = coords => coords.map(({x, y}) => `L ${x} ${y}`).join(' ')

export default data => {
  let offsetX = -1525405088 + (64 * 24 * 60 * 60) + (12 * 60 * 60) + (38 * 60) + 8
  let offsetY = 300
  const scaleX = 32
  const scaleY = 1
  const scaleXMultiplier = 1 / (60 * 60 * 24)
  const scaleYMultiplier = 0.0001

  const toSvgCoord = ({dateTime, amount}) => {
    return ({
      x: (offsetX + dateTime.valueOf()) * scaleX * scaleXMultiplier,
      y: offsetY - amount * scaleY * scaleYMultiplier
    })
  }

  const records = data.records
    .filter(record => record.type === 'bank')
    .map(record => ({dateTime: record.dateTime, amount: record.amount, content: record.content}))
    .reduce((arr, {dateTime, amount, content}) => arr.concat([{
      dateTime,
      content,
      amount: arr[arr.length - 1].amount + amount
    }]), [{amount: 0}])
    .slice(1)

  const coords = records.map(toSvgCoord)
  const pathCoords = coords.concat([
    {x: 99999, y: coords.slice(-1)[0].y},
    {x: 99999, y: 99999},
    {x: 0, y: 99999},
    {x: 0, y: coords[0].y}
  ])

  return (
    $svg({version: '1.1', width: '100%', height: '700', xmlns: 'http://www.w3.org/2000/svg'})(
      $path({d: `M 0 300 ${toLine(pathCoords)}`, 'stroke-width': 0, fill: 'rgba(150,255,200,0.4)'})(
        records.map(toSvgCoord).map(({x, y}) =>
          $circle({cx: x, cy: y, r: 1, fill: 'rgba(100,255,200,0.7)'}))
      )
    )
  )
};
