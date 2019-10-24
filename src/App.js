import React from 'react'
import './App.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Charts from './Charts'
import Home from './Home'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/charts">Charts</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/charts">
              <Charts />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}
