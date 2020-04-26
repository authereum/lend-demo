import React from 'react'
import './App.css'
import Header from './components/common/Header'
import HomePage from './components/pages/HomePage/HomePage'
import ComponentPage from './components/pages/ComponentPage/ComponentPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {
  ThemeProvider,
  createMuiTheme,
  ThemeOptions
} from '@material-ui/core/styles'

import theme from './theme'

function App() {
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <div className="App">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <Header />

          <Switch>
            <Route path="/" exact={true} component={ HomePage } />
            <Route path="/components"  component={ ComponentPage } />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
