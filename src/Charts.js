import React from 'react'
import './App.css'
import {loadCoordData} from './lib/localStore'
import CanvasJSReact from './lib/canvasjs.react'
//var CanvasJSReact = require('./canvasjs.react');
// let CanvasJS = CanvasJSReact.CanvasJS
let CanvasJSChart = CanvasJSReact.CanvasJSChart

export default class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {items: [], chartType: 'column'}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    if (!e.target.value) {
      return
    }
    console.log(e.target.value)
    this.setState({chartType: e.target.value})
  }

  setChartData = coords => {
    let XandY = []
    coords.map(item => XandY.push(item.coord))
    console.log(XandY)
    this.setState(state => ({
      items: XandY,
    }))
  }

  getCoordData = () => {
    const coordData = loadCoordData()
    console.log(coordData)
    this.setChartData(coordData)
  }

  componentDidMount = () => {
    this.getCoordData()
  }

  render() {
    const options = {
      title: {
        text: 'Charts',
      },
      data: [
        {
          type: this.state.chartType,
          dataPoints: this.state.items,
        },
      ],
    }

    return (
      <div>
        <label htmlFor="charttype">Chart Type</label>
        <select id="charttype" onChange={this.handleChange} value={this.state.chartType}>
          <option value="column">Column</option>
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="scatter">Scatter</option>
        </select>
        <CanvasJSChart
          options={options}
          /* onRef = {ref => this.chart = ref} */
        />
      </div>
    )
  }
}
