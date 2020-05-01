import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  ThemeProvider
} from '@material-ui/core/styles'

import './App.css'
import theme from './theme'

import Header from './components/Header'
import LendPage from './components/LendPage'

function App() {
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <div className="App">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <Header />

          <Switch>
            <Route path="/" exact={true} component={ LendPage } />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
