import React from 'react'
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

import './App.css'
import theme from './theme'

import Header from './components/Header'
import HomePage from './components/HomePage'
import ComponentPage from './components/ComponentPage'
import TransactionComposerPage from './components/TransactionComposerPage'

function App() {
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <div className="App">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

          <Header />

          <Switch>
            <Route path="/" exact={true} component={ TransactionComposerPage } />
            <Route path="/components"  component={ ComponentPage } />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
