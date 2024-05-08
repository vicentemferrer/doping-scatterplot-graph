import * as d3 from 'd3'

const { max, min, select, scaleLinear, scaleTime, axisBottom, axisLeft, easeLinear, scaleOrdinal, schemeCategory10, timeFormat, format, extent } = d3

const graph = select('#graph')

const xScale = scaleLinear()
const yScale = scaleTime()

const xAxis = axisBottom()
const yAxis = axisLeft()

const tFormat = timeFormat('%M:%S')
const color = scaleOrdinal(schemeCategory10)

export { graph, xScale, yScale, xAxis, yAxis, max, min, easeLinear, color, tFormat, format, extent }