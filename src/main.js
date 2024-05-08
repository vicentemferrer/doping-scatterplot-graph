import { graph, xScale, yScale, xAxis, yAxis, max, min, easeLinear, color, tFormat, format, extent } from './d3-components.js'
import { getData, timeTemplate } from './helpers.js'
import './style.css'

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

const caughtData = await getData(url)

const data = caughtData.map(obj => {
  const parsedTime = obj.Time.split(':')
  obj.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1])
  return obj
})

const width = 920
const height = 630
const padding = 50

const tooltip = graph.append('div').attr('id', 'tooltip').style('opacity', 0)
const svg = graph.append('svg').attr('width', width).attr('height', height)

// Setting data scales, axis, and helper functions
const getYearX = d => d.Year
const getTimeY = d => d.Time
const getDoping = d => d.Doping

const fillIt = d => color(getDoping(d) !== '')

const xDomain = [min(data, getYearX) - 1, max(data, getYearX) + 1]
const yDomain = extent(data, getTimeY)

xScale.domain(xDomain).range([padding, width - padding])
yScale.domain(yDomain).range([padding, height - padding])

const cx = d => xScale(getYearX(d))
const cy = d => yScale(getTimeY(d))

xAxis.scale(xScale).tickFormat(format('d'))
yAxis.scale(yScale).tickFormat(tFormat)

// Dispatching graph
svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('cx', cx)
  .attr('cy', cy)
  .attr('r', 6)
  .attr('fill', fillIt)
  .attr('data-xvalue', getYearX)
  .attr('data-yvalue', d => getTimeY(d).toISOString())

svg.append('g')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(xAxis)
  .attr('id', 'x-axis')

svg.append('g')
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis)
  .attr('id', 'y-axis')