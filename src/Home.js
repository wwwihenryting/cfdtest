import React from 'react'
import './App.css'
import {saveCoordData, loadCoordData, deleteCoord} from './lib/localStore'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {items: [], coordX: 0, coordY: 0, coordId: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
    if (!parseInt(e.target.value)) {
      return
    }
    this.setState({[e.currentTarget.id]: parseInt(e.target.value)})
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!Number.isInteger(this.state.coordX) || !Number.isInteger(this.state.coordY)) {
      return
    }
    const newItem = {
      coord: {x: this.state.coordX, y: this.state.coordY},
      id: !this.state.coordId ? Date.now() : this.state.coordId,
    }
    saveCoordData(newItem, this.state.coordId)

    this.setState(state => ({
      coordX: 0,
      coordY: 0,
      coordId: false,
    }))

    this.getCoordData()
  }

  getCoordData = () => {
    const coordData = loadCoordData()
    console.log(coordData)
    this.setState(state => ({
      items: coordData,
    }))
  }

  removeCoord = id => {
    deleteCoord(id)
    this.getCoordData()
  }

  componentDidMount = () => {
    this.getCoordData()
  }

  render() {
    return (
      <div>
        <h3>COORDINATES</h3>
        {this.renderCoordList(this.state.items)}
        <form onSubmit={this.handleSubmit}>
          <h4>{!this.state.coordId ? '' : 'UPDATING ' + this.state.coordId}</h4>
          <label htmlFor="coordX">X Coordinate</label>
          <input id="coordX" onChange={this.handleChange} value={this.state.coordX} />
          <br />
          <label htmlFor="coordY">Y Coordinate</label>
          <input id="coordY" onChange={this.handleChange} value={this.state.coordY} />
          <button>{!this.state.coordId ? 'ADD' : 'UPDATE'}</button>
        </form>
      </div>
    )
  }

  renderCoordList = items => {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            ID:{item.id} -- {item.coord.x},{item.coord.y}
            <button onClick={() => this.setState({coordX: item.coord.x, coordY: item.coord.y, coordId: item.id})}>
              EDIT
            </button>
            <button onClick={() => this.removeCoord(item.id)}>DELETE</button>
          </li>
        ))}
      </ul>
    )
  }
}
